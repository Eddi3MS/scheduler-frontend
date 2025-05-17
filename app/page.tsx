import { AnimateOnView } from '@/components/animate-on-view'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle,
  Clock,
  Heart,
  Phone,
  Shield,
  Smile,
  Sparkles,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const features = [
  {
    icon: <Smile className="h-6 w-6" />,
    title: 'Corte Masculino',
    description:
      'Cortes modernos e tradicionais feitos por profissionais experientes, com atenção aos detalhes.',
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Barba e Finalização',
    description:
      'Barba aparada, desenhada ou completa, com toalha quente e produtos de qualidade.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Corte Infantil',
    description:
      'Atendimento especial para crianças, em um ambiente acolhedor e tranquilo.',
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Atendimento com Hora Marcada',
    description:
      'Agende seu horário e evite esperas. Pontualidade e praticidade para o seu dia.',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: 'Tratamento Capilar',
    description:
      'Hidratação, controle de oleosidade e cuidados para manter seus fios saudáveis.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Design de Sobrancelha',
    description:
      'Realce seu olhar com o design ideal para o formato do seu rosto.',
  },
]

const benefits = [
  'Ambiente moderno',
  'Equipe experiente',
  'Serviços de alta qualidade',
  'Horários flexíveis',
  'Agendamento facilitado',
  'Preço justo e transparência',
]

export default function Home() {
  return (
    <main className="">
      <section className="relative overflow-hidden bg-black py-20 md:py-28 lg:py-32">
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-5xl text-center">
            <AnimateOnView asChild direction="down" delay={100}>
              <div className="mb-6 inline-flex items-center rounded-full border border-orange-600/20 bg-orange-400/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Transformando estilos desde 2005</span>
              </div>
            </AnimateOnView>

            <AnimateOnView asChild direction="down" delay={200}>
              <h1 className="mb-6 text-white font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Seu estilo, <br className="md:hidden" />
                Nossa Paixão
              </h1>
            </AnimateOnView>

            <AnimateOnView asChild direction="down" delay={300}>
              <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 md:text-xl">
                Viva uma experiência única em nossa barbearia, em um ambiente
                moderno e acolhedor. Nossa equipe especializada está pronta para
                cuidar do seu visual com atenção aos detalhes e estilo que você
                merece.
              </p>
            </AnimateOnView>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <AnimateOnView asChild direction="down">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="group h-12 bg-orange-700 px-6 text-white hover:bg-orange-600"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Agendar
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </AnimateOnView>

              <AnimateOnView asChild direction="down">
                <Link href="#services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group h-12 border-orange-500/30 bg-orange-500/10 px-6 text-white backdrop-blur-sm hover:bg-orange-400/20 hover:text-white"
                  >
                    Explorar serviços
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </AnimateOnView>
            </div>
          </div>

          {/* Hero image/illustration */}
          <div className="mx-auto mt-16 max-w-4xl relative">
            <AnimateOnView asChild delay={500} direction="down">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-white/10  backdrop-blur-sm shadow-md">
                <Image
                  src="/barber.jpg"
                  width={768}
                  height={512}
                  alt="barber shop"
                  className="w-full aspect-[16/9]"
                />
              </div>
            </AnimateOnView>

            {/* Floating elements */}
            <AnimateOnView asChild delay={700} direction="down">
              <div className="absolute -right-24 top-1/4 hidden rounded-xl bg-white p-4 shadow-xl md:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-orange-600"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">98% Satisfação</p>
                    <p className="text-sm text-gray-500">De nossos clientes</p>
                  </div>
                </div>
              </div>
            </AnimateOnView>

            <AnimateOnView asChild delay={800} direction="down">
              <div className="absolute -left-24 bottom-1/4 hidden rounded-xl bg-white p-4 shadow-xl md:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-orange-600"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Corte com Estilo
                    </p>
                    <p className="text-sm text-gray-500">
                      Cuidado em cada detalhe
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnView>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
      <section className="py-20 md:py-14 bg-white" id="services">
        <div className="container px-4 md:px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <AnimateOnView asChild direction="down" delay={100}>
              <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                Serviços de Barbearia Completa
              </h2>
            </AnimateOnView>

            <AnimateOnView asChild direction="down" delay={400}>
              <p className="text-lg text-gray-600 md:text-xl">
                Oferecemos uma experiência completa em cuidados masculinos —
                cortes, barba, hidratação e estilo — tudo em um só lugar.
              </p>
            </AnimateOnView>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <AnimateOnView
                key={index}
                direction="down"
                delay={200 + index * 80}
                asChild
              >
                <Card className="h-full group relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-500/10 transition-all duration-300 group-hover:bg-orange-500/40"></div>
                  <CardHeader className="space-y-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-300 text-white shadow-md">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </section>
      <section
        className="relative overflow-hidden bg-gray-50 to-white py-20 md:py-28"
        id="about"
      >
        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              <AnimateOnView asChild direction="down">
                <div className="overflow-hidden rounded-2xl bg-white shadow-xl aspect-square">
                  <Image
                    src="/barbers.jpg"
                    width={320}
                    height={320}
                    alt="barber shop"
                    className="w-full aspect-square"
                  />
                </div>
              </AnimateOnView>

              {/* Decorative elements */}
              <AnimateOnView asChild delay={150} direction="down">
                <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-orange-600 p-1">
                  <div className="h-full w-full rounded-full bg-white"></div>
                </div>
              </AnimateOnView>

              <AnimateOnView asChild delay={200} direction="down">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full border-8 border-white bg-orange-100"></div>
              </AnimateOnView>
            </div>

            <div className="order-1 flex flex-col justify-center lg:order-2">
              <AnimateOnView asChild direction="down">
                <span className="inline-flex items-center rounded-full bg-orange-400 px-3 py-1 text-sm font-medium self-start text-white">
                  Sobre nossa barbearia
                </span>
              </AnimateOnView>

              <AnimateOnView asChild direction="down">
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Cuidado Masculino de Excelência para Todas as Idades
                </h2>
              </AnimateOnView>

              <AnimateOnView asChild direction="down">
                <p className="mt-6 text-lg text-gray-600">
                  Na nossa barbearia, unimos tradição, estilo e atendimento
                  personalizado para oferecer uma experiência completa. Nossa
                  equipe de barbeiros qualificados está pronta para cuidar de
                  você com técnicas modernas, produtos de qualidade e um
                  ambiente acolhedor.
                </p>
              </AnimateOnView>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <AnimateOnView
                    key={index}
                    asChild
                    delay={200 + index * 80}
                    direction="down"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  </AnimateOnView>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <AnimateOnView asChild direction="down" delay={500}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                      <span className="text-lg font-bold text-orange-700">
                        20+
                      </span>
                    </div>

                    <div>
                      <p className="font-medium text-gray-900">
                        Anos de Experiência
                      </p>
                      <p className="text-sm text-gray-600">
                        Barbearia de confiança
                      </p>
                    </div>
                  </div>
                </AnimateOnView>

                <AnimateOnView asChild direction="down" delay={600}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                      <span className="text-lg font-bold text-orange-700">
                        10k+
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Clientes satisfeitos
                      </p>
                      <p className="text-sm text-gray-600">
                        Cortes que conquistam
                      </p>
                    </div>
                  </div>
                </AnimateOnView>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-tr from-orange-400 via-orange-700 to-orange-400 shadow-xl">
            <div className="relative px-6 py-16 sm:px-12 md:px-16 md:py-20 lg:py-24">
              <div className="relative z-10 mx-auto max-w-3xl text-center">
                <AnimateOnView asChild direction="down" delay={200}>
                  <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                    Pronto para o seu melhor corte?
                  </h2>
                </AnimateOnView>

                <AnimateOnView asChild direction="down" delay={300}>
                  <p className="mb-10 text-lg text-white/90 md:text-xl">
                    Agende seu horário hoje mesmo e descubra uma nova
                    experiência em cuidados pessoais. Estamos prontos para
                    oferecer o atendimento que você merece.
                  </p>
                </AnimateOnView>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <AnimateOnView asChild delay={400} direction="down">
                    <Link href="/login">
                      <Button
                        size="lg"
                        className="group h-12 bg-white px-6 text-orange-600 hover:bg-white/90"
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        Agendar
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </AnimateOnView>
                  <AnimateOnView asChild delay={500} direction="down">
                    <Link
                      href="https://wa.me/+5537999853557?text=Olá, vim da landing page"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="h-12 border-white/30 bg-white/10 px-6 text-white backdrop-blur-sm hover:bg-white/20"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        Entre em contato
                      </Button>
                    </Link>
                  </AnimateOnView>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/80">
                  <AnimateOnView
                    className="flex items-center"
                    delay={600}
                    direction="down"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-5 w-5"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                    <span>Pontualidade e compromisso</span>
                  </AnimateOnView>
                  <AnimateOnView
                    className="flex items-center"
                    delay={700}
                    direction="down"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-5 w-5"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>Ambiente acolhedor</span>
                  </AnimateOnView>
                  <AnimateOnView
                    className="flex items-center"
                    delay={800}
                    direction="down"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-5 w-5"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                    </svg>
                    <span>Diversas formas de pagamento</span>
                  </AnimateOnView>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 bg-gray-900 text-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimateOnView asChild delay={200} direction="down">
            <div className="flex flex-wrap gap-4">
              <Image
                src="/logo.png"
                width={80}
                height={80}
                alt="Sua marca"
                className="w-24 aspect-square rounded-full mx-auto md:mx-0"
              />
              <div className="w-full text-white tex-center md:text-left">
                <div className="mb-4">
                  <p className="font-medium text-lg">Sua marca</p>

                  <p>Rua Exemplo, 123 - Centro, São Paulo - SP</p>
                </div>

                <div className="mt-auto">
                  <p className="font-medium text-lg">Contatos:</p>
                  <ul className="list-none">
                    <li>
                      <span className="font-bold">Telefone:</span> (11)
                      1234-5678
                    </li>
                    <li>
                      <span className="font-bold">WhatsApp:</span> (11)
                      98765-4321
                    </li>
                    <li>
                      <span className="font-bold">E-mail:</span>{' '}
                      contato@barbearia.com
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimateOnView>
          <AnimateOnView asChild delay={300} direction="down">
            <div className="w-full flex flex-col items-start gap-4">
              <div className="relative rounded-md overflow-hidden bg-white mx-auto max-w-sm md:max-w-none w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29260.442799120952!2d-46.634411!3d-23.54849!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59abb2b2eef1%3A0xfdb32e67a44103f5!2sCatedral%20Metropolitana%20de%20S%C3%A3o%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1747067046934!5m2!1spt-BR!2sbr"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full aspect-video"
                  title="Mapa do local"
                ></iframe>
              </div>

              <p className="text-sm text-center mx-auto mt-auto">
                © {new Date().getFullYear()} Barber Shop. Todos os direitos
                reservados.
              </p>
            </div>
          </AnimateOnView>
        </div>
      </footer>
    </main>
  )
}
