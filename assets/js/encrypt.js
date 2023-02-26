const searchingArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                        'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

document.getElementById('btnEncrypt').addEventListener('click', () => {
  const toEncrypt = document.getElementById('inputEncrypt').value.toUpperCase().replaceAll(' ', '');
  const key = document.getElementById('inputKey').value.toUpperCase().replaceAll(' ', '');
  if (toEncrypt.length == 0 || key.length == 0) {
    showAlert('Por favor ingrese todos los datos correspondientes');
    return;
  }

  const keyFilled = fillKey(key, toEncrypt);
  if (toEncrypt.length != keyFilled.length) {
    showAlert('Error, encriptado no correspondiente a proceso');
    return;
  }

  const responseText = findIndexesByChar(toEncrypt, keyFilled);
  document.getElementById('encryptTxt').innerText = `Texto: ${toEncrypt}`;
  document.getElementById('keyTxt').innerText = `Clave emparejada: ${keyFilled}`;
  document.getElementById('responseTxt').innerText = `Respuesta: ${responseText}`;
  document.getElementById('copyButton').setAttribute('onclick', `copyClipboard('${responseText}')`);
  document.getElementById('copyButton').style.display = 'flex';
  document.getElementById('textForm').style.display = 'flex';
  showAlert("Encriptado realizado con éxito", true);
});

const fillKey = (key, toEncrypt) => {
  let keyResponse = key;
  const encryptTextLng = toEncrypt.length;
  while(keyResponse.length <= encryptTextLng) {
    keyResponse += key;
  }

  const diffLng = keyResponse.length - encryptTextLng;
  return keyResponse.substring(0, keyResponse.length - diffLng);
}

const findIndexesByChar = (encrypt, key) => {
  const toEncryptArray = Array.from(encrypt);
  const keyFilledArray = Array.from(key);
  let responseText = '';

  for (let index = 0; index < toEncryptArray.length; index++) {
    const element = toEncryptArray[index];
    const element2 = keyFilledArray[index];
    const index1 = searchingArray.findIndex((p) => p === element);
    const index2 = searchingArray.findIndex((p) => p === element2);
    responseText += searchingArray[(index1 + index2) % searchingArray.length];
  }

  return responseText;
}

const showAlert = (text, isSuccess = false)  => {
  document.getElementById('alertNotification').classList.remove('success');
  document.getElementById('alertNotification').classList.add('fail');
  document.querySelector('#alertNotification>img').src = 'https://web.yimiglobal.com/assets/icons/fail-alert.svg';
  if (isSuccess) {
    document.getElementById('alertNotification').classList.add('success');
    document.querySelector('#alertNotification>img').src = 'https://web.yimiglobal.com/assets/icons/success-alert.svg';

  }
  document.querySelector('#alertNotification>p').innerText = text;
  document.getElementById('alertNotification').classList.add('shown');
  setTimeout(() => {
    document.getElementById('alertNotification').classList.remove('shown');
  }, 3000);
}

const copyClipboard = (text) => {
  let aux = document.createElement("input");
  aux.setAttribute("value", text);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");
  document.body.removeChild(aux);
  showAlert("Copiado en tu clipboard", true);
}

const closePanel = () => {
  document.getElementById('encryptTxt').innerText = `Texto: `;
  document.getElementById('keyTxt').innerText = `Clave emparejada: `;
  document.getElementById('responseTxt').innerText = `Respuesta: `;
  document.getElementById('copyButton').setAttribute('onclick', `copyClipboard('')`);
  document.getElementById('copyButton').style.display = 'none';
  document.getElementById('textForm').style.display = 'none';
  document.getElementById('inputEncrypt').value = '';
  document.getElementById('inputKey').value = '';
}

const alphanumeric = (e) => {
  if (e.key == 'Enter') {
    document.getElementById('btnEncrypt').click();
    return false;
  }
  return /[a-zA-Z\s]+/g.test(e.key);
}