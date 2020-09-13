const RutaBase = 'http://trascenti.com/pruebasDragon/public/api/usuarios/';

export const Login = (email,password) => {
    const URL = RutaBase + "login?usu_email=" + email+"&usu_password="+password ;
    return fetch(URL, {
                method: "GET"
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const Registro = (usu_nombre,usu_apellido_paterno,usu_apellido_materno,usu_email,usu_password,usu_nickname,usu_telefono) => {
    const URL = RutaBase + "store";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usu_nombre: usu_nombre,
                    usu_apellido_paterno: usu_apellido_paterno,
                    usu_apellido_materno: usu_apellido_materno,
                    usu_email: usu_email,
                    usu_password: usu_password,
                    usu_nickname: usu_nickname,
                    usu_telefono: usu_telefono
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};