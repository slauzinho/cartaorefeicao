import HTMLParser from 'fast-html-parser';
import request from 'superagent';
import qs from 'qs';
import _ from 'lodash';

export const loginEdenred = async (cardNumber, cardPassword) => {
  const agent = request.agent();
  const getResult = await agent.get(
    'https://www.myedenred.pt/euroticket/pages/login.jsf'
  );
  const root = HTMLParser.parse(getResult.text);
  const java = root
    .querySelectorAll('input')
    .filter(element => _.includes(element.id, 'j_id1:javax.faces.ViewState'));
  const javaParam = java[0].attributes.value;
  const payload = {
    'javax.faces.ViewState': javaParam,
     loginform: 'loginform',
    'loginform:username': cardNumber,
    'loginform:password': cardPassword,
    'loginform:loginButton': 'Entrar'
  };

  const urlEncoded = qs.stringify(payload);

  const postResult = await agent
    .post('https://www.myedenred.pt/euroticket/pages/login.jsf')
    .send(urlEncoded);

  return postResult.text;
};

export const loginSantander = async (cardNumber, cardPassword) => {
  const agent = request.agent();
  await agent.get(
    `https://www.particulares.santandertotta.pt/bepp/sanpt/usuarios/loginrefeicao/?accion=3&identificacionUsuario=${cardNumber}&claveConsultiva=${cardPassword}`
  );
  const getResult = await agent.get(
    'https://www.particulares.santandertotta.pt/bepp/sanpt/tarjetas/listadomovimientostarjetarefeicao/0,,,0.shtml'
  );

  return getResult;
};
