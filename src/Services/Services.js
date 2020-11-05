const RutaBase = 'http://trascenti.com/pruebasDragon/public/api/';
const RutaBaseAB = 'http://13.90.32.51/DragonGolfBackEnd/api'

export const Logearse = (email,password) => {
    const URL = RutaBase + "usuarios/login?usu_email=" + email+"&usu_password="+password ;
    return fetch(URL, {
                method: "GET"
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const LogearseAB = (Usuario,Pass) => {
    const URL = RutaBaseAB + "/LoginUsuario";
    return fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Usuario: Usuario,
        Pass: Pass
      }),
    })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error);
    });
};

export const InfoUsuario = (usu_id) => {
    const URL = RutaBase + "usuarios/show?usu_id=" + usu_id ;
    return fetch(URL, {
                method: "GET"
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const InfoUsuarioAB = (IDUsuario) => {
    const URL = RutaBaseAB + "/InfoUsuario";
    return fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IDUsuario: IDUsuario
      }),
    })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error);
    });
};

export const Registro = (usu_nombre,usu_apellido_paterno,usu_apellido_materno,usu_email,usu_password,usu_nickname,usu_telefono, usu_imagen) => {
    const formData = new FormData();

      formData.append('usu_nombre', usu_nombre);
      formData.append('usu_apellido_paterno', usu_apellido_paterno);
      formData.append('usu_apellido_materno', usu_apellido_materno);
      formData.append('usu_email', usu_email);
      formData.append('usu_password', usu_password);
      formData.append('usu_nickname', usu_nickname);
      formData.append('usu_telefono', usu_telefono);
      formData.append('usu_imagen', usu_imagen);

      const URL = RutaBase + "usuarios/store";
      return fetch(URL, {

        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .catch((error) => {
          console.warn(error)
        })
};

export const RegistroAB = (usu_nombre,usu_apellido_paterno,usu_apellido_materno,usu_email,usu_pass,usu_nickname,usu_telefono) => {
    const URL = RutaBaseAB + "/RegistrarUsuario";
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
        usu_pass: usu_pass,
        usu_nickname: usu_nickname,
        usu_telefono: usu_telefono
      }),
    })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error);
    });
};

export const CrearInvitados = (usu_nombre,usu_apellido_paterno,usu_nickname,usu_handicapindex,usu_ghinnumber,usu_golpesventaja,usu_diferenciatee,IDUsuarioCrea) => {
    const URL = RutaBaseAB + "/CrearInvitados";
    return fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usu_nombre: usu_nombre,
        usu_apellido_paterno: usu_apellido_paterno,
        usu_nickname: usu_nickname,
        usu_handicapindex: usu_handicapindex,
        usu_ghinnumber: usu_ghinnumber,
        usu_golpesventaja: usu_golpesventaja,
        usu_diferenciatee: usu_diferenciatee,
        IDUsuarioCrea: IDUsuarioCrea
      }),
    })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error);
    });
};

export const SubirImagenUsuario = (IDUsuario, file) => {

  const formData = new FormData();

  formData.append('IDUsuario', IDUsuario);

  formData.append('file', file);

  const url = RutaBaseAB + '/SubirImagenUsuario';
  return fetch(url, {

    method: 'POST',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error)
    })
};

export const Update = (IDUsuario,usu_nombre,usu_apellido_paterno,usu_apellido_materno,usu_email,usu_nickname,usu_telefono,usu_ghinnumber,usu_handicapindex) => {
    const URL = RutaBaseAB + "/ActualizarUsuario";
    return fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IDUsuario: IDUsuario,
        usu_nombre: usu_nombre,
        usu_apellido_paterno: usu_apellido_paterno,
        usu_apellido_materno: usu_apellido_materno,
        usu_email: usu_email,
        usu_nickname: usu_nickname,
        usu_telefono: usu_telefono,
        usu_ghinnumber: usu_ghinnumber,
        usu_handicapindex: usu_handicapindex
      }),
    })
    .then((response) => response.json())
    .catch((error) => {
      console.warn(error);
    });
};

export const updateSettings = (usu_id,set_idioma,set_how_adv_move,set_strokes_moved_per_round,
set_adv_moves_on_9_holes,set_carry_moves_adv,set_rabbit_1_6,set_rabbit_7_12,set_rabbit_13_18,set_medal_play_f9,
set_medal_play_b9,set_medal_play_18,set_skins,set_skins_carry_over,set_lower_adv_f9,set_snw_automatic_press,
set_snw_use_factor, set_snw_front_9,set_snw_back_9,set_snw_match,set_snw_carry,set_snw_medal,
set_tmw_automatic_press, set_tmw_use_factor, set_tmw_front_9,set_tmw_back_9,set_tmw_match,set_tmw_carry,
set_tmw_medal,set_tmw_adv_strokes,set_eb_wager,set_bbt_wager_f9,set_bbt_wager_b9,set_bbt_wager_18,
set_stableford_double_eagle,set_stableford_eagle,set_stableford_birdie,set_stableford_par,set_stableford_bogey,
set_stableford_double_bogey) => {
    const URL = RutaBase + "settings/update";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usu_id: usu_id,
                    set_idioma: set_idioma,
                    set_how_adv_move: set_how_adv_move,
                    set_strokes_moved_per_round: set_strokes_moved_per_round,
                    set_adv_moves_on_9_holes: set_adv_moves_on_9_holes,
                    set_carry_moves_adv: set_carry_moves_adv,
                    set_rabbit_1_6: set_rabbit_1_6,
                    set_rabbit_7_12: set_rabbit_7_12,
                    set_rabbit_13_18: set_rabbit_13_18,
                    set_medal_play_f9: set_medal_play_f9,
                    set_medal_play_b9: set_medal_play_b9,
                    set_medal_play_18: set_medal_play_18,
                    set_skins: set_skins,
                    set_skins_carry_over: set_skins_carry_over,
                    set_lower_adv_f9: set_lower_adv_f9,
                    set_snw_automatic_press: set_snw_automatic_press,
                    set_snw_use_factor: set_snw_use_factor,
                    set_snw_front_9: set_snw_front_9,
                    set_snw_back_9: set_snw_back_9,
                    set_snw_match: set_snw_match,
                    set_snw_carry: set_snw_carry,
                    set_snw_medal: set_snw_medal,
                    set_tmw_automatic_press: set_tmw_automatic_press,
                    set_tmw_use_factor: set_tmw_use_factor,
                    set_tmw_front_9: set_tmw_front_9,
                    set_tmw_back_9: set_tmw_back_9,
                    set_tmw_match: set_tmw_match,
                    set_tmw_carry: set_tmw_carry,
                    set_tmw_medal: set_tmw_medal,
                    set_tmw_adv_strokes: set_tmw_adv_strokes,
                    set_eb_wager: set_eb_wager,
                    set_bbt_wager_f9: set_bbt_wager_f9,
                    set_bbt_wager_b9: set_bbt_wager_b9,
                    set_bbt_wager_18: set_bbt_wager_18,
                    set_stableford_double_eagle: set_stableford_double_eagle,
                    set_stableford_eagle: set_stableford_eagle,
                    set_stableford_birdie: set_stableford_birdie,
                    set_stableford_par: set_stableford_par,
                    set_stableford_bogey: set_stableford_bogey,
                    set_stableford_double_bogey: set_stableford_double_bogey
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const updateSettingsAB = (IDSettings,usu_id,set_idioma,set_how_adv_move,set_strokes_moved_per_round,
set_adv_moves_on_9_holes,set_carry_moves_adv,set_rabbit_1_6,set_rabbit_7_12,set_rabbit_13_18,set_medal_play_f9,
set_medal_play_b9,set_medal_play_18,set_skins,set_skins_carry_over,set_lower_adv_f9,set_snw_automatic_press,
set_snw_use_factor, set_snw_front_9,set_snw_back_9,set_snw_match,set_snw_carry,set_snw_medal,
set_tmw_automatic_press, set_tmw_use_factor, set_tmw_front_9,set_tmw_back_9,set_tmw_match,set_tmw_carry,
set_tmw_medal,set_tmw_adv_strokes,set_eb_wager,set_bbt_wager_f9,set_bbt_wager_b9,set_bbt_wager_18,
set_stableford_double_eagle,set_stableford_eagle,set_stableford_birdie,set_stableford_par,set_stableford_bogey,
set_stableford_double_bogey) => {
    const URL = RutaBaseAB + "/ActualizarSettings";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDSettings: IDSettings,
                    IDUsuario: usu_id,
                    set_idioma: set_idioma,
                    set_how_adv_move: set_how_adv_move,
                    set_strokes_moved_per_round: set_strokes_moved_per_round,
                    set_adv_moves_on_9_holes: set_adv_moves_on_9_holes,
                    set_carry_moves_adv: set_carry_moves_adv,
                    set_rabbit_1_6: set_rabbit_1_6,
                    set_rabbit_7_12: set_rabbit_7_12,
                    set_rabbit_13_18: set_rabbit_13_18,
                    set_medal_play_f9: set_medal_play_f9,
                    set_medal_play_b9: set_medal_play_b9,
                    set_medal_play_18: set_medal_play_18,
                    set_skins: set_skins,
                    set_skins_carry_over: set_skins_carry_over,
                    set_lower_adv_f9: set_lower_adv_f9,
                    set_snw_automatic_press: set_snw_automatic_press,
                    set_snw_use_factor: set_snw_use_factor,
                    set_snw_front_9: set_snw_front_9,
                    set_snw_back_9: set_snw_back_9,
                    set_snw_match: set_snw_match,
                    set_snw_carry: set_snw_carry,
                    set_snw_medal: set_snw_medal,
                    set_tmw_automatic_press: set_tmw_automatic_press,
                    set_tmw_use_factor: set_tmw_use_factor,
                    set_tmw_front_9: set_tmw_front_9,
                    set_tmw_back_9: set_tmw_back_9,
                    set_tmw_match: set_tmw_match,
                    set_tmw_carry: set_tmw_carry,
                    set_tmw_medal: set_tmw_medal,
                    set_tmw_adv_strokes: set_tmw_adv_strokes,
                    set_eb_wager: set_eb_wager,
                    set_bbt_wager_f9: set_bbt_wager_f9,
                    set_bbt_wager_b9: set_bbt_wager_b9,
                    set_bbt_wager_18: set_bbt_wager_18,
                    set_stableford_double_eagle: set_stableford_double_eagle,
                    set_stableford_eagle: set_stableford_eagle,
                    set_stableford_birdie: set_stableford_birdie,
                    set_stableford_par: set_stableford_par,
                    set_stableford_bogey: set_stableford_bogey,
                    set_stableford_double_bogey: set_stableford_double_bogey
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ListaCampos = (IDUsuario) => {
    const URL = RutaBaseAB + "/ListaCampos";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ListaTodos = (IDUsuario) => {
    const URL = RutaBaseAB + "/ListaTodos";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ListaAmigos = (IDUsuario) => {
    const URL = RutaBaseAB + "/ListaAmigos";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ListaInvitados = (IDUsuario) => {
    const URL = RutaBaseAB + "/ListadoInvitados";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ListaJugadores = (IDUsuario) => {
    const URL = RutaBaseAB + "/ListaJugadores";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const AltaAmigos = (IDUsuarioFav,IDUsuario,Fav_Status) => {
    const URL = RutaBaseAB + "/AltaAmigos";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDUsuarioFav: IDUsuarioFav,
                    IDUsuario: IDUsuario,
                    Fav_Status: Fav_Status
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const QuitarAmigos = (IDUsuarioFav,IDUsuario) => {
    const URL = RutaBaseAB + "/QuitarAmigos";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDUsuarioFav: IDUsuarioFav,
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ActualizarHoles = (IDTees,Arreglo) => {
    const URL = RutaBaseAB + "/ActualizarHoles";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDTees: IDTees,
                    Arreglo: Arreglo
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ListaCamposTodos = (IDUsuario) => {
    const URL = RutaBaseAB + "/ListaCamposTodos";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const CopiarCampo = (IDCourse, IDUsuario) => {
    const URL = RutaBaseAB + "/CopiarCampo";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDCourse: IDCourse,
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ListaTees = (IDCourse) => {
    const URL = RutaBaseAB + "/ListaTees";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDCourse: IDCourse
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ListaHole = (IDTees) => {
    const URL = RutaBaseAB + "/ListaHole";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDTees: IDTees
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const AltaCampo = (Cou_Nombre, Cou_NombreCorto, Cou_Ciudad, Cou_Pais, IDUsuario) => {
    const URL = RutaBaseAB + "/AltaCampo";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Cou_Nombre: Cou_Nombre,
                    Cou_NombreCorto: Cou_NombreCorto,
                    Cou_Ciudad: Cou_Ciudad,
                    Cou_Pais: Cou_Pais,
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ActualizaCampo = (IDCourse, Cou_Nombre, Cou_NombreCorto, Cou_Ciudad, Cou_Pais, IDUsuario) => {
    const URL = RutaBaseAB + "/ActualizarCampos";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDCourse: IDCourse,
                    Cou_Nombre: Cou_Nombre,
                    Cou_NombreCorto: Cou_NombreCorto,
                    Cou_Ciudad: Cou_Ciudad,
                    Cou_Pais: Cou_Pais,
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const AltaTees = (Te_TeeName, Te_Slope, Te_Rating, Te_TeeColor, Te_In, Te_Out, Te_Total, IDCourse) => {
    const URL = RutaBaseAB + "/AltaTees";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Te_TeeName: Te_TeeName,
                    Te_Slope: Te_Slope,
                    Te_Rating: Te_Rating,
                    Te_TeeColor: Te_TeeColor,
                    Te_In: Te_In,
                    Te_Out: Te_Out,
                    Te_Total: Te_Total,
                    IDCourse: IDCourse,
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ActualizarTees = (IDTees, Te_TeeName, Te_Slope, Te_Rating, Te_TeeColor, Te_In, Te_Out, Te_Total, IDCourse) => {
    const URL = RutaBaseAB + "/ActualizarTees";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDTees: IDTees,
                    Te_TeeName: Te_TeeName,
                    Te_Slope: Te_Slope,
                    Te_Rating: Te_Rating,
                    Te_TeeColor: Te_TeeColor,
                    Te_In: Te_In,
                    Te_Out: Te_Out,
                    Te_Total: Te_Total,
                    IDCourse: IDCourse,
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const AltaHoles = (Ho_TeeName, Ho_Hole, Ho_Par, Ho_Advantage, Ho_Yards, IDTees) => {
    const URL = RutaBaseAB + "/AltaHoles";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Ho_TeeName: Ho_TeeName,
                    Ho_Hole: Ho_Hole,
                    Ho_Par: Ho_Par,
                    Ho_Advantage: Ho_Advantage,
                    Ho_Yards: Ho_Yards,
                    IDTees: IDTees,
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const ActualizarHoles2 = (IDTees, Ho_TeeName, Ho_Hole, Ho_Par, Ho_Advantage, Ho_Yards, IDHoles) => {
    const URL = RutaBaseAB + "/ActualizarHoles";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDTees: IDTees,
                    Ho_TeeName: Ho_TeeName,
                    Ho_Hole: Ho_Hole,
                    Ho_Par: Ho_Par,
                    Ho_Advantage: Ho_Advantage,
                    Ho_Yards: Ho_Yards,
                    IDHoles: IDHoles,
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const EliminarCampo = (IDCourse, Tipo, IDUsuario) => {
    const URL = RutaBaseAB + "/EliminarCampo";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDCourse: IDCourse,
                    Tipo: Tipo,
                    IDUsuario: IDUsuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const EliminarTees = (IDCourse, IDTees) => {
    const URL = RutaBaseAB + "/EliminarTees";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDCourse: IDCourse,
                    IDTees: IDTees
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const EliminarHoles = (IDHoles, IDTees) => {
    const URL = RutaBaseAB + "/EliminarHoles";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IDHoles: IDHoles,
                    IDTees: IDTees
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};

export const OlvideContrasena = (usuario) => {
    const URL = RutaBaseAB + "/OlvideContrasena";
    return fetch(URL, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    usuario:usuario
                }),
            })
            .then((response) => response.json())
            .catch((error) => {
                    console.warn(error);
                });
};