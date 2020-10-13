const RutaBase = 'http://trascenti.com/pruebasDragon/public/api/';

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

export const Update = (usu_id,usu_nombre,usu_apellido_paterno,usu_apellido_materno,usu_nickname,usu_telefono) => {
    const formData = new FormData();

      formData.append('usu_id', usu_id);
      formData.append('usu_nombre', usu_nombre);
      formData.append('usu_apellido_paterno', usu_apellido_paterno);
      formData.append('usu_apellido_materno', usu_apellido_materno);
      formData.append('usu_nickname', usu_nickname);
      formData.append('usu_telefono', usu_telefono);

      const URL = RutaBase + "usuarios/update";
      return fetch(URL, {

        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .catch((error) => {
          console.warn(error)
        })
};

export const Update2 = (usu_id,usu_nombre,usu_apellido_paterno,usu_apellido_materno,usu_nickname,usu_telefono, usu_imagen) => {
    const formData = new FormData();

      formData.append('usu_id', usu_id);
      formData.append('usu_nombre', usu_nombre);
      formData.append('usu_apellido_paterno', usu_apellido_paterno);
      formData.append('usu_apellido_materno', usu_apellido_materno);
      formData.append('usu_nickname', usu_nickname);
      formData.append('usu_telefono', usu_telefono);
      formData.append('usu_imagen', usu_imagen);

      const URL = RutaBase + "usuarios/update";
      return fetch(URL, {

        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .catch((error) => {
          console.warn(error)
        })
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