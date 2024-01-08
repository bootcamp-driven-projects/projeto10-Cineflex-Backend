# ROTAS


## FILMES:
## Listar Filmes por Data

Retorna uma lista de filmes e suas respectivas sessões para uma data específica.

### Requisição HTTP

`GET /api/movies/by-date`

### Parâmetros passado pelo body

| Parâmetro | Tipo   | Descrição                                         |
|-----------|--------|---------------------------------------------------|
| `date`    | string | **Opcional**. Data no formato 'AAAA-MM-DD'. Se não fornecido, a data atual será usada. |

### Resposta de Sucesso

- **Código**: 200 OK
- **Conteúdo de exemplo**:

```json
[
  {
    "date": "2021-08-16",
    "weekday": "Monday",
    "showtimes": [
      {
        "time- **Conteúdo de exemplo**:
": "19:00",
        "movie": {
          "title": "Mulan",
          "image": "path/to/journey_through_space.jpg",
          "overview": "Explore the vastness of space in this thrilling adventure.",
          "releaseDate": "2021-08-16",
          "ageRating": "10"
        },
        "audioType": "Dubbed",
        "screenType": "2D",
        "experienceType": "Platinum",
        "seatsAvailable": 12
      },
      {
        "time": "21:00",
        // Mais sessões...
      }
    ]
  },
  // Mais dias...
]
