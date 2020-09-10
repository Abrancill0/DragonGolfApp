const Details = {
    hcpIndex: {
        title: {
            'en': 'Handicap Index',
            'es': 'Handicap Index'
        },
        info: {
            'en': 'A Handicap Index is a number used to represent your potential scoring ability, which is always expressed as a number taken to one decimal place (e.g. 10.4). This number is used to calculate how many strokes you would potentially need to adjust your score back to par, and allows golfers of all skill levels to compete on an even playing field. For example, if you have a Handicap Index of 21.3, it means you generally shoot about 21 strokes over par on an average course.',
            'es': 'El Handicap Index es un número utilizado para representar su capacidad de puntuación potencial, que siempre se expresa como un número tomado con un decimal (por ejemplo, 10.4). Este número se utiliza para calcular cuántos golpes necesitaría potencialmente para ajustar su puntaje a par, y permite a los golfistas de todos los niveles competir de forma equilibrada en un campo de juego. Por ejemplo, si tiene un Handicap Index de 21.3, significa que generalmente realiza alrededor de 21 golpes sobre el par en promedio en un campo.'
        },
        retrieved: {
            'en': 'Retrieved from www.scga.org',
            'es': 'Obtenido de www.scga.org',
        },
        url: 'http://www.scga.org/blog/11756/what-is-a-handicap-index/'
    },
    skinCarryOver: {
        title: {
            'en': 'Skin Carry Over',
            'es': 'Skin Carry Over'
        },
        info: {
            'en': 'The Skin Carry Over flag sets the cumulative option of a tie in a hole. If when playing Skins the hole is tied, this flag ON means that the next hole will play double. If this second hole is tied also, the next hole plays tripple and so on.\n\nIf the flag is OFF, when tie nobody wins the bet.',
            'es': 'La opción Skin Carry Over establece la opción acumulativa de un empate en un hoyo. Si al jugar Skins el hoyo está empatado, esta opción activada significa que el siguiente hoyo jugará el doble. Si este segundo hoyo también está empatado, el siguiente hoyo juega triple y así sucesivamente.\n\nSi la opcioón está desactivada, cuando haya empate nadie gana la apuesta.'
        },
    },
    lowerAdvOnF9: {
        title: {
            'en': 'Lower Advantage on Front Nine Holes',
            'es': 'Menor Ventaja en los Primeros Nueve Hoyos'
        },
        info: {
            'en': 'The Lower Adv On F9, means that if the round is played starting hole number 10, the advantage for each hole will be subtracted by one and the second round will be increased by one.',
            'es': 'La opción Lower Adv On F9 significa que si la ronda se juega comenzando el hoyo número 10, a la ventaja de cada hoyo se le restará uno y a la segunda ronda se le sumará uno.'
        }
    },
    whoGetsAdv: {
        title: {
            'en': 'Who Gets The Advantage Strokes',
            'es': 'Quién Recibe los Golpes de Ventaja'
        },
        info: {
            'en': `Hi Hcp: The player with the highest handicap will receive the strokes.

Low Hcp: The player with the lowest handicap will receive the strokes.
            
Each: The lower and the higher handicaps of each team will get the strokes accordingly agains the lower and the highest of the other team.
            
Slid Hi: The highest handicap of the team with the greatest average of sliding handicap against both players in the other team will get the strokes.
            
Slid Low: The lowest handicap of the team with the greatest average of sliding handicap agains both players in the other team will get the strokes.
            `,
            es: `Hi Hcp: el jugador con el mayor Handicap recibirá los golpes.

Low Hcp: el jugador con el handicap más bajo recibirá los golpes.
            
Each: los handicaps más bajos y más altos de cada equipo recibirán los golpes en consecuencia contra los más bajos y más altos del otro equipo.
            
Slid Hi: el mayor handicap del equipo con el mayor promedio de slid handicap contra ambos jugadores del otro equipo recibirá los golpes.
            
Slid Low: el handicap más bajo del equipo con el mayor promedio de slid handicap contra ambos jugadores del otro equipo recibirá los golpes.
            `
        }
    },
    hcpAutoAdj: {
        title: {
            'en': 'Handicap Auto Adjustment',
            'es': 'Auto Ajuste de Handicap'
        },
        info: {
            'en': "Handicap auto adjustment is the percent of reduction for everybody's handicap",
            'es': 'El ajuste automático de Handicap es el porcentaje de reducción para el Handicap de todos'
        }
    },
    startingHole: {
        title: {
            'en': 'Starting Hole',
            'es': 'Hoyo Inicial'
        },
        info: {
            'en': 'Starting hole is when you are playing a tournament and there is a shot gun. You can start you betting games in any hole.',
            'es': 'El hoyo inicial es cuando estás jugando un torneo y hay un shot gun. Puedes comenzar a apostar en cualquier hoyo.'
        }
    },
    switchAdv: {
        title: {
            'en': 'Switch Advantage B9/F9',
            'es': 'Switch Advantage B9/F9'
        },
        info: {
            'en': "Switch advantage B9/F9 is for when you don't start on the first hole, you can play the advantages in the first round.",
            'es': 'Switch Adv B9/F9 es para cuando no comienzas en el primer hoyo, puedes jugar las ventajas en la primera ronda.'
        }
    },
    splitOnTie: {
        title: {
            'en': 'Split on tie mode',
            'es': 'Dividir en modo empate'
        },
        info: {
            'en': `Lwr Hcp: in case of tie, the winner is the player with lower handicap. If they have the same handicap, the wager is divided in half.
            
Hi Hcp: in case of tie, the winner is the player with Higher handicap. If they have the same handicap, the wager is divided in half.
            
By Adv: in case of tie, the winner is determined by comparing the hole with the lower advantage and handicap is used to determine the lower score. If tie still, next lower advantage will follow until 18 holes. If still tie, the wager is divided in half.`,
            'es': `Lwr Hcp: en caso de empate, el ganador es el jugador con menor handicap. Si tienen el mismo handicap, la apuesta se divide por la mitad.
            
Hi Hcp: en caso de empate, el ganador es el jugador con mayor handicap. Si tienen el mismo handicap, la apuesta se divide por la mitad.
            
By Adv: en caso de empate, el ganador se determina comparando el hoyo con la ventaja más baja y se usa el handicap para determinar la puntuación más baja. Si el empate sigue, la siguiente ventaja más baja seguirá hasta 18 hoyos. Si aún empata, la apuesta se divide por la mitad.`
        }
    }
};

export default Details