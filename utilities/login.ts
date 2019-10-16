import request from 'superagent';
import _ from 'lodash';
import axios, { AxiosResponse } from 'axios';
import HTMLParser from 'fast-html-parser';

const generateEdenredTransactions = transactions =>
    transactions.map(transaction => {
        const regex = /(.*)\s{2,10}/gm;
        const m = regex.exec(transaction.transactionName.trim().replace('Compra: ', ''));
        let description = transaction.transactionName.trim().replace('Compra: ', '');
        if (m) {
            description = m[0].trim();
        }
        const utcDate = new Date(transaction.transactionDate);
        const date = utcDate.toLocaleDateString();
        return {
            date,
            description: description,
            value: (transaction.amount + '€').replace('.', ','),
        };
    });

export const loginEdenred = async (cardNumber, password, email) => {
    const postData = {
        userId: email,
        password,
        rememberme: true,
    };

    const headers = {
        'postman-token': 'f1e2cec5-9d57-6415-127c-ad9abf8610ec',
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    try {
        const config = {
            url: 'https://www.myedenred.pt/edenred-customer/api/authenticate/default',
            method: 'POST' as 'POST',
            headers,
            params: { appVersion: '1.0', appType: 'PORTAL', channel: 'WEB' },
            data: postData,
            withCredentials: true,
            crossdomain: true,
        };
        var {
            data: {
                data: { token },
            },
        } = await axios(config);
    } catch (err) {
        throw 'Login invalido';
    }

    const {
        data: { data: cards },
    } = await axios.get('https://www.myedenred.pt/edenred-customer/api/protected/card/list', {
        headers: { Authorization: token },
    });

    const card = cards.filter(card => card.number == cardNumber)[0];

    try {
        const {
            data: {
                data: { movementList: transactions },
            },
            data: {
                data: {
                    account: { availableBalance },
                },
            },
        } = await axios.get<
            AxiosResponse<{
                movementList: string[];
                account: { availableBalance: string };
            }>
        >(`https://www.myedenred.pt/edenred-customer/api/protected/card/${card.id}/accountmovement?appVersion=1.0`, {
            headers: { Authorization: token },
        });

        return {
            saldo: (availableBalance + '€').replace('.', ','),
            transactions: generateEdenredTransactions(transactions),
        };
    } catch (err) {
        throw 'Numero do cartão não existe';
    }
};

function handleNbpGuard(token) {
    const regex = /(.*):(.*)/gm;
    const m = regex.exec(token);
    let matched;
    m.forEach((match, groupIndex) => {
        if (groupIndex === 2) {
            matched = match;
        }
    });
    return matched;
}

export const loginSantander = async (cardNumber, cardPassword, tentativas = 0) => {
    const agent = request.agent();
    const r = await agent.get(
        'https://www.particulares.santandertotta.pt/bepp/sanpt/usuarios/loginrefeicao/0,,,0.shtml',
    );
    const headers = { 'FETCH-CSRF-TOKEN': '1' };
    const config = {
        url: 'https://www.particulares.santandertotta.pt/nbp_guard',
        method: 'POST' as 'POST',
        headers,
        withCredentials: true,
        crossdomain: true,
    };
    const nbpGuardString = await axios(config);
    const nbpGuard = await handleNbpGuard(nbpGuardString.data);
    const root = HTMLParser.parse(r.text);
    const javaCodes = root.querySelectorAll('input');
    const uuiCodeCardNumber = javaCodes[1].id;
    const uuiCodeCardCVC = javaCodes[2].id;

    console.log({
        nbpGuard,
        uuiCodeCardNumber,
        uuiCodeCardCVC,
    });

    await agent
        .post('https://www.particulares.santandertotta.pt/bepp/sanpt/usuarios/loginrefeicao/?')
        .send('accion=3')
        .send(`${uuiCodeCardNumber}=${cardNumber}`)
        .send(`${uuiCodeCardCVC}=${cardPassword}`)
        .send(`OGC_TOKEN=${nbpGuard}`);

    const getResult = await agent.get(
        'https://www.particulares.santandertotta.pt/bepp/sanpt/tarjetas/listadomovimientostarjetarefeicao/0,,,0.shtml',
    );

    const transactionsHtml = HTMLParser.parse(getResult.text);

    const validLogin = transactionsHtml.querySelectorAll('input');
    if (validLogin.length <= 3) {
        console.log('falhou uma vez');
        if (tentativas < 4) {
            return loginSantander(cardNumber, cardPassword, tentativas + 1);
        } else {
            console.log('falhou duas vezes');
            throw 'Login Invalido';
        }
    } else {
        const transactions = transactionsHtml
            .querySelectorAll('table.trans')[1]
            .querySelector('tbody')
            .querySelectorAll('tr')
            .slice(1)
            .map(tr => tr.querySelectorAll('td').reduce(reducerSantander, {}));

        const saldo =
            transactionsHtml
                .querySelector('table.trans')
                .querySelector('tbody')
                .querySelectorAll('tr')[1]
                .querySelectorAll('td')[2]
                .querySelector('b')
                .text.slice(0, -4) + '€';

        return {
            saldo: saldo.replace('.', ','),
            transactions,
        };
    }
};

export const reducerSantander = (accumulator, currentValue, index) => {
    if (index === 0) {
        return { ...accumulator, date: currentValue.removeWhitespace().text };
    }
    if (index === 1) {
        return accumulator;
    }
    if (index === 2) {
        return {
            ...accumulator,
            description: !isNaN(parseFloat(currentValue.removeWhitespace().text.slice(0, 6)))
                ? currentValue.removeWhitespace().text.slice(15)
                : currentValue.removeWhitespace().text,
        };
    }
    return {
        ...accumulator,
        value: currentValue.removeWhitespace().text.slice(0, -4) + '€',
    };
};
