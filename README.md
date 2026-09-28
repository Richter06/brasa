# BRASA

**BRASA** é uma landing page conceitual para um restaurante fictício de cozinha brasileira contemporânea.

O projeto foi desenvolvido como uma demonstração de uma experiência digital onde **fotografia, vídeo, tipografia e movimento** são os principais elementos da interface.

A proposta não é transformar o restaurante em uma experiência excessivamente tecnológica, mas usar tecnologia para valorizar aquilo que realmente importa: **a comida, o ambiente e a experiência à mesa.**

[Ver projeto online](https://brasa-beta.vercel.app/)

---

## Sobre o projeto

A BRASA foi criada como um projeto de vitrine para a **Rouxinol**, explorando como uma marca poderia apresentar uma solução digital completa para um restaurante.

A direção visual combina:

* Preto carvão
* Laranja inspirado no fogo
* Creme quente
* Tipografia editorial
* Fotografia e vídeo em grande escala
* Animações controladas pelo scroll
* Microinterações sutis
* Layout responsivo

A identidade busca equilibrar duas ideias:

> **sofisticação sem distância**

e

> **tecnologia que trabalha para a experiência, e não o contrário.**

---

## Conceito

O nome **BRASA** parte de duas associações principais:

* **Brasil**, pela proposta gastronômica;
* **Brasa**, pelo fogo, calor e preparo dos alimentos.

A experiência visual acompanha esse conceito através de uma interface predominantemente escura, contrastada por tons quentes de laranja e creme.

O conteúdo é apresentado de maneira narrativa, conduzindo o visitante da primeira impressão até a reserva.

---

## Experiência

A página foi construída como uma experiência contínua, e não como uma sequência convencional de blocos.

### Hero

A abertura utiliza um vídeo em tela cheia como elemento principal.

**BRASA**

> Brasil servido à mesa.

O visitante encontra a identidade do restaurante antes mesmo de começar a navegar pelo conteúdo.

### Introdução

A seção apresenta o conceito da cozinha através de texto editorial e vídeo.

O vídeo começa parado no primeiro frame e pode ser reproduzido através da interação do usuário.

Em dispositivos com mouse, o movimento do cursor também influencia suavemente a perspectiva do conteúdo.

### Pratos da casa

Os pratos principais recebem grande destaque visual.

Cada prato possui:

* Nome
* Descrição
* Preço
* Vídeo próprio

Os vídeos podem ser reproduzidos através de hover em dispositivos compatíveis ou por toque/clique em dispositivos móveis.

A entrada dos elementos utiliza `IntersectionObserver` para revelar progressivamente o conteúdo conforme ele aparece na viewport.

### A cozinha

A cozinha é apresentada como uma experiência controlada pelo scroll.

O visitante encontra a pergunta:

**QUEM SOMOS NÓS?**

e, conforme avança pela seção, a narrativa evolui através de:

**FOGO.**

**AMOR.**

**TEMPERO**

**& SABOR**

O vídeo permanece como pano de fundo enquanto a tipografia acompanha a progressão do scroll.

### Cardápio

O cardápio utiliza painéis interativos para organizar as categorias:

* Entradas
* Principais
* Sobremesas

No desktop, as categorias podem ser abertas através de hover ou clique.

Ao selecionar um prato, o painel de visualização apresenta:

* Vídeo do prato
* Nome
* Descrição
* Preço

Em dispositivos touch, o layout se adapta para manter o conteúdo acessível sem depender de hover.

### Experiência

A seção transforma a navegação em um pequeno feed cinematográfico.

Cada etapa possui um vídeo associado a uma palavra:

**CHEGAR**

**SENTAR**

**AMAR**

**FICAR.**

No desktop, o scroll controla a transformação dos vídeos.

O vídeo começa em grande escala, a palavra desaparece através de uma cortina visual e, posteriormente, o vídeo diminui e se desloca para preparar a entrada da próxima experiência.

Em telas menores, a animação é simplificada para preservar usabilidade e desempenho.

### A casa

A seção apresenta:

* Endereço
* Horários
* Contato
* Localização no mapa

O mapa utiliza um embed do Google Maps.

### História

Uma seção editorial combina vídeo e texto para humanizar a marca.

A narrativa apresenta a BRASA como uma casa criada em torno de:

* comida brasileira;
* cuidado;
* fogo;
* hospitalidade;
* bons momentos à mesa.

### Reservas

A página termina com uma chamada visual para reserva.

A seção possui uma animação de entrada palavra por palavra e uma microinteração de **ímã no cursor** aplicada ao botão de reserva.

O campo magnético possui uma área maior que o próprio botão, fazendo com que a interação seja percebida antes mesmo de o cursor tocar diretamente nele.

---

## Tecnologias

### Front-end

* React 19
* Vite 6
* JavaScript
* HTML5
* CSS3

### APIs e recursos do navegador

* `IntersectionObserver`
* `requestAnimationFrame`
* `matchMedia`
* HTML5 `<video>`
* CSS `clip-path`
* CSS transforms
* CSS transitions
* CSS custom properties

### Tipografia

A interface utiliza:

* **Playfair Display** — títulos e elementos editoriais
* **Inter** — textos corridos
* **DM Mono** — navegação, labels e informações auxiliares

As fontes são carregadas através do Google Fonts.

---

## Estrutura do projeto

```text
brasa/
├── public/
│   └── media/
│       ├── vídeos
│       ├── imagens
│       └── posters
│
├── src/
│   ├── components/
│   │   └── brasa/
│   │       ├── Header.jsx
│   │       ├── Hero.jsx
│   │       ├── Intro.jsx
│   │       ├── SignatureDishes.jsx
│   │       ├── TheKitchen.jsx
│   │       ├── Menu.jsx
│   │       ├── Experience.jsx
│   │       ├── Restaurant.jsx
│   │       ├── Story.jsx
│   │       ├── Reservation.jsx
│   │       └── Footer.jsx
│   │
│   ├── data/
│   │   └── brasa.js
│   │
│   ├── styles/
│   │   └── brasa/
│   │       ├── base.css
│   │       ├── hero.css
│   │       ├── intro.css
│   │       ├── signature-dishes.css
│   │       ├── the-kitchen.css
│   │       ├── menu.css
│   │       ├── experience.css
│   │       ├── restaurant.css
│   │       ├── story.css
│   │       └── reservation.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## Arquitetura

O projeto utiliza uma arquitetura simples baseada em componentes React.

O `App.jsx` organiza a experiência principal:

```text
Header
  ↓
Hero
  ↓
Intro
  ↓
Signature Dishes
  ↓
The Kitchen
  ↓
Menu
  ↓
Experience
  ↓
Restaurant
  ↓
Story
  ↓
Reservation
  ↓
Footer
```

Os conteúdos gastronômicos ficam separados da interface em:

```text
src/data/brasa.js
```

Isso permite alterar pratos, preços, descrições e vídeos sem precisar modificar a estrutura dos componentes.

---

## Sistema de mídia

Grande parte da identidade da BRASA depende de vídeo.

Os componentes utilizam vídeos locais armazenados em:

```text
public/media/
```

Exemplos:

```text
steakVideoHero.mp4
introVideo.mp4
costelaVideo.mp4
fishVideo.mp4
feijoadaVideo.mp4
kitchenVideo.mp4
chegarVideo.mp4
sentarVideo.mp4
amarVideo.mp4
ficarVideo.mp4
brasaVideo.mp4
```

Os vídeos são utilizados como parte da própria composição visual da interface, e não apenas como elementos decorativos.

---

## Interações

O projeto utiliza principalmente APIs nativas do navegador para controlar as animações.

### IntersectionObserver

Utilizado para detectar quando elementos entram na viewport.

Aplicações:

* Entrada dos pratos
* Animações da seção de reservas
* Revelação progressiva de conteúdo

### requestAnimationFrame

Utilizado nas experiências que precisam acompanhar continuamente o scroll.

Aplicações:

* Transformações da cozinha
* Feed de experiências
* Movimento suave de elementos

### matchMedia

As interações verificam as capacidades do dispositivo antes de ativar determinados comportamentos.

Por exemplo:

```js
window.matchMedia(
  '(hover: hover) and (pointer: fine)'
)
```

Isso evita depender de hover em dispositivos touch.

### prefers-reduced-motion

As animações respeitam a preferência de movimento reduzido do usuário através de:

```css
@media (prefers-reduced-motion: reduce)
```

---

## Responsividade

A BRASA possui comportamentos diferentes dependendo do dispositivo.

### Desktop

Prioriza:

* Animações de scroll
* Hover
* Transformações de escala
* Movimento de mídia
* Interações com cursor

### Tablet

As animações mais pesadas são simplificadas para preservar a leitura e a navegação.

### Mobile

A experiência prioriza:

* Toque
* Conteúdo sempre acessível
* Vídeos em proporção adequada
* Menos transformações durante o scroll
* Layout vertical

A interface não depende exclusivamente de hover para funcionar.

---

## Direção visual

### Paleta

```text
#0D0C0B  — Preto carvão
#141210  — Preto suave
#F45A24  — Laranja brasa
#FF6A21  — Laranja vivo
#F1E9DC  — Creme
```

### Tipografia

```text
Playfair Display
    ↓
Títulos e elementos editoriais

Inter
    ↓
Texto e conteúdo

DM Mono
    ↓
Navegação, labels e informações auxiliares
```

A combinação busca criar contraste entre uma tipografia editorial mais expressiva e elementos informativos mais técnicos.

---

## Como executar localmente

Clone o repositório:

```bash
git clone https://github.com/Richter06/brasa.git
```

Entre na pasta:

```bash
cd brasa
```

Instale as dependências:

```bash
npm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
```

O Vite disponibilizará a aplicação localmente.

---

## Build de produção

Para gerar a versão otimizada:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

---

## Deploy

O projeto pode ser publicado diretamente através da Vercel utilizando o repositório GitHub.

A configuração atual utiliza Vite como ferramenta de build:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Objetivo do projeto

A BRASA foi criada para demonstrar como uma landing page comercial pode ir além de uma estrutura tradicional de:

```text
Hero
→
Texto
→
Cards
→
CTA
```

A proposta é construir uma narrativa visual onde cada seção possui uma função própria dentro da experiência.

O projeto explora especialmente:

* direção de arte para web;
* storytelling visual;
* interfaces editoriais;
* vídeo como elemento de UI;
* animações baseadas em scroll;
* microinterações;
* design responsivo;
* acessibilidade básica;
* componentização em React.

---

## Créditos

**BRASA** é um projeto conceitual desenvolvido como modelo de vitrine para a **Rouxinol**.

O restaurante apresentado no projeto é fictício.

Todos os conteúdos, informações, preços, endereço e contatos apresentados na interface fazem parte do conceito visual da demonstração.

---

## Status

**Concluído**

O projeto encontra-se publicado e funciona como uma demonstração de uma solução digital para o segmento gastronômico.

---

## Autor

Desenvolvido por **Richard R. Araújo**.

GitHub: **Richter06**
