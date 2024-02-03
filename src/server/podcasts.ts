export type Podcast = {
  id: string
  title: string
  language: 'de' | 'en'
  date: string
  hosts: {
    name: string
    role: 'moderator' | 'expert'
    voice: 'female' | 'male'
    description?: string
  }[]
  roughPlan: string
}

const hosts: Podcast['hosts'] = [
  {
    name: 'Tristan',
    role: 'moderator',
    voice: 'male',
    description:
      'Tristan is the moderator of this podcast. He is very curious and always asks the right questions. He has heard about the topic of this podcast before, but he is not an expert. He is very good at explaining complex topics in a simple way and he is very good at keeping the conversation going. He is also very good at making the guests feel comfortable and welcome. He has a creative mind and is always looking for new ideas. He is easily excited and sometimes has a funny way of digging deeper into a topic.',
  },
  {
    name: 'Lena',
    role: 'expert',
    voice: 'female',
    description:
      'Lena is a very powerful AI. She is an expert in the topic of this podcast. She has a lot of knowledge and is very good at explaining complex topics in a simple way. She is very good at answering questions. She does not ask many questions herself, but she is very good at giving detailed answers.',
  },
]

export const podcasts: Podcast[] = [
  {
    id: 'strom',
    language: 'de',
    title: 'Wie funktioniert eigentlich Strom?',
    date: '2024-02-03',
    hosts,
    roughPlan:
      'In dieser Folge wollen wir herausfinden, wie Strom eigentlich funktioniert. Wir sprechen über die Geschichte des Stroms, wie er erzeugt wird und wie er zu uns nach Hause kommt. Tristan wird am Anfang sowas sagen wie: Hi Lena, sag mal wie funktioniert eigentlich Strom? Ich hab da so Metaphern von meinem alten Physiklehrer im Kopf mit Gartenschläuchen und so. Wie war das noch mal? Später wird Tristan Fragen: Wie kommt man eigentlich auf die Idee Strom zu erzeugen? Ist jemand mit Socken über den Teppich gerutscht, hat einen gewischt bekommen und dann ging im ein Licht auf?',
  },
]

export const getPodcasts = async () => {
  return podcasts
}

export const getPodcast = async (id: string) => {
  return podcasts.find((p) => p.id === id)
}
