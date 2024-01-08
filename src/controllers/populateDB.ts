import { Request, Response } from "express";
import { Movie, ShowTime, Day } from "../models/movies";

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateSeats(): { number: string; isAvailable: boolean; }[] {
  let seats = [];
  for (let i = 1; i <= 20; i++) {
    seats.push({
      number: `Seat ${i}`,
      isAvailable: Math.random() > 0.5
    });
  }
  return seats;
}

export async function populateDB(req: Request, res: Response) {
  try {
    const allMoviesArray = [
      {
        title: "Mulan",
        image: "https://br.web.img3.acsta.net/c_310_420/pictures/19/12/05/16/00/0409486.jpg",
        overview: "Em Mulan, Hua Mulan (Liu Yifei) é a espirituosa e determinada filha mais velha de um honrado guerreiro. Quando o Imperador da China emite um decreto que um homem de cada família deve servir no exército imperial, Mulan decide tomar o lugar de seu pai, que está doente. Assumindo a identidade de Hua Jun, ela se disfarça de homem para combater os invasores que estão atacando sua nação, provando-se uma grande guerreira.",
        ageRating: "0",
      },
      {
        title: "Shrek",
        image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/91/54/04/20150812.jpg",
        overview: "Em um pântano distante vive Shrek (Mike Myers), um ogro solitário que vê, sem mais nem menos, sua vida ser invadida por uma série de personagens de contos de fada, como três ratos cegos, um grande e malvado lobo e ainda três porcos que não têm um lugar onde morar. Todos eles foram expulsos de seus lares pelo maligno Lorde Farquaad (John Lithgow). Determinado a recuperar a tranquilidade de antes, Shrek resolve encontrar Farquaad e com ele faz um acordo: todos os personagens poderão retornar aos seus lares se ele e seu amigo Burro (Eddie Murphy) resgatarem uma bela princesa (Cameron Diaz), que é prisioneira de um dragão. Porém, quando Shrek e o Burro enfim conseguem resgatar a princesa logo eles descobrem que seus problemas estão apenas começando.",
        ageRating: "0",
      },
      {
        title: "Interestelar",
        image: "https://br.web.img3.acsta.net/c_310_420/pictures/14/10/31/20/39/476171.jpg",
        overview: "Após ver a Terra consumindo boa parte de suas reservas naturais, um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper (Matthew McConaughey) é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand (Anne Hathaway), Jenkins (Marlon Sanders) e Doyle (Wes Bentley), ele seguirá em busca de uma nova casa. Com o passar dos anos, sua filha Murph (Mackenzie Foy e Jessica Chastain) investirá numa própria jornada para também tentar salvar a população do planeta.",
        ageRating: "12",
      },
      {
        title: "Ilha do Medo",
        image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/30/04/20028671.jpg",
        overview: "1954. Teddy Daniels (Leonardo DiCaprio) investiga o desaparecimento de um paciente no Shutter Island Ashecliffe Hospital, em Boston. No local, ele descobre que os médicos realizam experiências radicais com os pacientes, envolvendo métodos ilegais e anti-éticos. Teddy tenta buscar mais informações, mas enfrenta a resistência dos médicos em lhe fornecer os arquivos que possam permitir que o caso seja aberto. Quando um furacão deixa a ilha sem comunicação, diversos prisioneiros conseguem escapar e tornam a situação ainda mais perigosa.",
        ageRating: "14",
      },
      {
        title: "Alladin",
        image: "https://br.web.img2.acsta.net/c_310_420/pictures/19/03/12/17/42/1157358.jpg",
        overview: "Aladdin (Mena Massoud) é um jovem ladrão que vive de pequenos roubos em Agrabah. Um dia, ele ajuda uma jovem a recuperar um valioso bracelete, sem saber que ela na verdade é a princesa Jasmine (Naomi Scott). Aladdin logo fica interessado nela, que diz ser a criada da princesa. Ao visitá-la em pleno palácio e descobrir sua identidade, ele é capturado por Jafar (Marwan Kenzari), o grão-vizir do sultanato, que deseja que ele recupere uma lâmpada mágica, onde habita um gênio (Will Smith) capaz de conceder três desejos ao seu dono.",
        ageRating: "0",
      },
      {
        title: "Clube da Luta",
        image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/95/96/20122166.jpg",
        overview: "Jack (Edward Norton) é um executivo jovem, trabalha como investigador de seguros, mora confortavelmente, mas ele está ficando cada vez mais insatisfeito com sua vida medíocre. Para piorar ele está enfrentando uma terrível crise de insônia, até que encontra uma cura inusitada para o sua falta de sono ao frequentar grupos de auto-ajuda. Nesses encontros ele passa a conviver com pessoas problemáticas como a viciada Marla Singer (Helena Bonham Carter) e a conhecer estranhos como Tyler Durden (Brad Pitt). Misterioso e cheio de ideias, Tyler apresenta para Jack um grupo secreto que se encontra para extravasar suas angústias e tensões através de violentos combates corporais.",
        ageRating: "14",
      },
      {
        title: "Whispers of the Forest",
        image: "path/to/whispers_of_the_forest.jpg",
        overview: "Venture into the heart of the forest where the trees tell old tales.",
        ageRating: "10",
      },
      {
        title: "Questão de Tempo",
        image: "https://br.web.img2.acsta.net/c_310_420/pictures/210/530/21053062_20131025204305591.jpg",
        overview: "Ao completar 21 anos, Tim (Domhnall Gleeson) é surpreendido com a notícia dada por seu pai (Bill Nighy) de que pertence a uma linhagem de viajantes no tempo. Ou seja, todos os homens da família conseguem viajar para o passado, bastando apenas ir para um local escuro e pensar na época e no local para onde deseja ir. Cético a princípio, Tim logo se empolga com o dom ao ver que seu pai não está mentindo. Sua primeira decisão é usar esta capacidade para conseguir uma namorada, mas logo ele percebe que viajar no tempo e alterar o que já aconteceu pode provocar consequências inesperadas.",
        ageRating: "12",
      },
      {
        title: "Como eu era antes de você",
        image: "https://br.web.img3.acsta.net/c_310_420/pictures/16/02/03/19/11/303307.jpg",
        overview: "Em Como Eu Era Antes de Você, o rico e bem sucedido Will (Sam Claflin) leva uma vida repleta de conquistas, viagens e esportes radicais até ser atingido por uma moto. O acidente o torna tetraplégico, obrigando-o a permanecer em uma cadeira de rodas. A situação o torna depressivo e extremamente cínico, para a preocupação de seus pais (Janet McTeer e Charles Dance). É neste contexto que Louisa Clark (Emilia Clarke) é contratada para cuidar de Will. De origem modesta, com dificuldades financeiras e sem grandes aspirações na vida, ela faz o possível para melhorar o estado de espírito de Will e, aos poucos, acaba se envolvendo com ele.",
        ageRating: "0",
      },
      {
        title: "Divergente",
        image: "https://br.web.img3.acsta.net/c_310_420/pictures/14/02/18/21/20/583093.jpg",
        overview: "Divergente acompanha a adolescente Beatrice (Shailene Woodley) na futurística Chicago. Ao completar 16 anos, a jovem terá que escolher entre as diferentes facções em que a cidade está dividida. Elas são cinco e cada uma representa um valor diferente, como honestidade, generosidade e coragem. Beatrice surpreende a todos e até a si mesma quando decide pela facção dos destemidos, diferente da família. Ao entrar para a Audácia ela torna-se Tris e entra numa jornada para afastar seus medos e descobrir quem é de verdade. Além disso conhece Quatro (Theo James), rapaz experiente que consegue intrigá-la e encantá-la ao mesmo tempo.",
        ageRating: "12",
      },
      {
        title: "Jogos Vorazes",
        image: "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/87/35/87/20039778.jpg",
        overview: "Num futuro distante, boa parte da população é controlada por um regime totalitário, que relembra esse domínio realizando um evento anual - e mortal - entre os 12 distritos sob sua tutela. Para salvar sua irmã caçula, a jovem Katniss Everdeen (Jennifer Lawrence) se oferece como voluntária para representar seu distrito na competição e acaba contando com a companhia de Peeta Melark (Josh Hutcherson), desafiando não só o sistema dominante, mas também a força dos outros oponentes.",
        ageRating: "12",
      },
      {
        title: "Vingadores: Ultimato",
        image: "https://br.web.img2.acsta.net/c_310_420/pictures/19/04/26/17/30/2428965.jpg",
        overview: "Em Vingadores: Ultimato, após Thanos eliminar metade das criaturas vivas em Vingadores: Guerra Infinita, os heróis precisam lidar com a dor da perda de amigos e seus entes queridos. Com Tony Stark (Robert Downey Jr.) vagando perdido no espaço sem água nem comida, o Capitão América/Steve Rogers (Chris Evans) e a Viúva Negra/Natasha Romanov (Scarlett Johansson) precisam liderar a resistência contra o titã louco.",
        ageRating: "12",
      },
      {
        title: "O Rei Leão",
        image: "https://br.web.img3.acsta.net/c_310_420/pictures/19/05/07/20/54/2901026.jpg",
        overview: "Live action do clássico da Disney, em O Rei Leão, Simba (Donald Glover) é um jovem leão cujo destino é se tornar o rei da selva. Entretanto, uma armadilha elaborada por seu tio Scar (Chiwetel Ejiofor) faz com que Mufasa (James Earl Jones), o atual rei, morra ao tentar salvar o filhote. Consumido pela culpa, Simba deixa o reino rumo a um local distante, onde encontra amigos que o ensinam a mais uma vez ter prazer pela vida.",
        ageRating: "0",
      },
      {
        title: "As Cronicas de Narnia: Prince Caspian",
        image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/77/34/19961400.jpg",
        overview: "Um ano depois os irmãos Lucy (Georgie Henley), Edmund (Skandar Keynes), Susan (Anna Popplewell) e Peter (William Moseley) retornam ao mundo de Nárnia, onde já se passaram 1300 anos desde sua última visita. Durante sua ausência Nárnia foi conquistada pelo rei Miraz (Sergio Castellitto), que governa o local sem misericórdia. Os irmãos Pevensie então conhecem Caspian (Ben Barnes), o príncipe de direito de Nárnia, que precisa se refugiar por ser procurado por Miraz, seu tio. Decididos a destronar Miraz, o grupo reúne os narnianos restantes para combatê-lo.",
        ageRating: "10",
      },
      {
        title: "As Branquelas",
        image: "https://br.web.img2.acsta.net/c_310_420/medias/nmedia/18/97/52/82/20534159.jpg",
        overview: "Em As Branquelas, os irmãos Marcus (Marlon Wayans) e Kevin Copeland (Shawn Wayans) são detetives do FBI que estão com problemas no trabalho. A última investigação da dupla foi um grande fracasso e eles estão sob a ameaça de serem demitidos. Quando um plano para sequestrar as mimadas irmãs Brittany (Maitland Ward) e Tiffany Wilson (Anne Dudek) é descoberto, o caso é entregue aos principais rivais dos irmãos Copeland, os agentes Vincent Gomez (Eddie Velez) e Jack Harper (Lochlyn Munro). Para aumentar ainda mais a humilhação da dupla, eles são escalados para escoltar as jovens mimadas do aeroporto até o local de um evento pelo qual elas esperaram por meses. Porém no trajeto um acidente de carro provoca um verdadeiro desastre: enquanto uma das irmãs arranha o nariz, a outra corta o lábio. Desesperadas, elas se recusam a ir ao evento. É quando,para salvar o emprego, Marcus e Kevin decidem por assumir as identidades das irmãs.",
        ageRating: "0",
      },
      {
        title: "O Poderoso Chefão",
        image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/90/93/20/20120876.jpg",
        overview: "Don Vito Corleone (Marlon Brando) é o chefe de uma família de Nova York que está feliz, pois Connie (Talia Shire), sua filha, se casou com Carlo (Gianni Russo). Porém, durante a festa, Bonasera (Salvatore Corsitto) é visto no escritório de Don Corleone pedindo justiça, vingança na verdade contra membros de uma quadrilha, que espancaram",
        ageRating: "12",
      },
      {
        title: "A Lista de Schindler",
        image: "https://br.web.img3.acsta.net/c_310_420/pictures/19/04/10/19/44/2904073.jpg",
        overview: "A inusitada história de Oskar Schindler (Liam Neeson), um sujeito oportunista, sedutor, armador, simpático, comerciante no mercado negro, mas, acima de tudo, um homem que se relacionava muito bem com o regime nazista, tanto que era membro do próprio Partido Nazista ",
        ageRating: "14",
      },
      {
        title: "Forrest Gump - O Contador de Histórias",
        image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/87/30/21/19874092.jpg",
        overview: "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções. Por obra do acaso, ele consegue participar de momentos cruciais, como a Guerra do Vietnã e Watergate, mas continua pensando no seu amor de infância, Jenny Curran.",
        ageRating: "0",
      },
      {
        title: "O Senhor dos Anéis: O Retorno do Rei",
        image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/92/91/47/20224867.jpg",
        overview: "Sauron planeja um grande ataque a Minas Tirith, capital de Gondor, o que faz com que Gandalf (Ian McKellen) e Pippin (Billy Boyd) partam para o local na intenção de ajudar a resistência. Um exército é reunido por Theoden (Bernard Hill) em Rohan, em mais uma tentativa de deter as forças de Sauron.",
        ageRating: "10",
      },
      {
        title: "Batman - O Cavaleiro Das Trevas",
        image: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/86/98/32/19870786.jpg",
        overview: "Após dois anos desde o surgimento do Batman (Christian Bale), os criminosos de Gotham City têm muito o que temer. Com a ajuda do tenente James Gordon (Gary Oldman) e do promotor público Harvey Dent (Aaron Eckhart), Batman luta contra o crime organizado.",
        ageRating: "12",
      }
    ]
    
    const moviesPerDay = 4;
    
    const audioTypes = ['Dubbed', 'Subtitled'];
    const screenTypes = ['2D', '3D'];
    const experienceTypes = ['Standard', 'Platinum'];
    const movieTimes = ['19:00', '21:00'];

    for (let d = 0; d < 30; d++) {
      const day = new Day({
        weekday: new Date().toLocaleString('en-us', { weekday: 'long' }),
        date: new Date(new Date().setDate(new Date().getDate() + d))
      });

      let dailyMovies = [];
      let moviesArrayCopy = [...allMoviesArray];
      for (let i = 0; i < moviesPerDay; i++) {
        const selectedMovie = getRandomElement(moviesArrayCopy);
        dailyMovies.push(selectedMovie);
        moviesArrayCopy = moviesArrayCopy.filter(movie => movie.title !== selectedMovie.title);
      }

      for (const movieData of dailyMovies) {
        const movie = new Movie({
          ...movieData,
          releaseDate: new Date(),
        });
        await movie.save();

        for (let t = 0; t < 2; t++) {
          const showTime = new ShowTime({
            time: movieTimes[t],
            movieId: movie._id,
            seats: generateSeats(),
            audioType: getRandomElement(audioTypes),
            screenType: getRandomElement(screenTypes),
            experienceType: getRandomElement(experienceTypes)
          });
          await showTime.save();
          day.showTimeIds.push(showTime._id);
        }
      }
      await day.save();
    }
    res.status(200).send('Database populated successfully!');
  } catch (error) {
    res.status(500).send('Error populating database');
  }
}

   
      

   
export async function clearOldSessions() {
  try {
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    await Day.deleteMany({ date: { $lt: yesterday } });
  } catch (error) {
    console.error('Error clearing old sessions', error);
  }
}
