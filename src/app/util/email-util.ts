export function isEmail(value: string): boolean {

  if (!value) return false;

  const usuario = value.substring(0, value.indexOf("@"));
  const dominio = value.substring(value.indexOf("@") + 1, value.length);

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) return true;
  else return false;

}