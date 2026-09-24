# 📸 FOTOS.md - Direção de Arte e Análise Visual

## 1. Análise Individual das Mídias

### 🖼️ `01-hero.jpg`
- **Papel no site:** Hero Section (Tela inicial de impacto).
- **Luz e Humor:** Luz natural suave (golden hour), humor sofisticado, sereno e acolhedor.
- **Composição e Espaço Negativo:** Assunto posicionado seguindo a regra dos terços. Espaço negativo limpo no lado [esquerdo/direito] da imagem, perfeito para sobreposição de tipografia gigante e elegante.
- **Cores Dominantes (HEX):** `#D4A373` (Dourado suave), `#FAEDCD` (Creme), `#6B705C` (Verde oliva sutil), `#333333` (Grafite para texto).
- **Alt Text Sugerido:** "Retrato elegante em luz natural, transmitindo sofisticação e confiança."

### 🖼️ `02-secundaria.jpg`
- **Papel no site:** Seção "Sobre" ou elemento Sticky (fixo durante o scroll).
- **Luz e Humor:** Iluminação mais direcional, criando profundidade e textura. Humor profissional e próximo.
- **Composição e Espaço Negativo:** Enquadramento médio. Fundo levemente desfocado (bokeh), isolando o sujeito e criando um espaço limpo ao redor para texto editorial.
- **Cores Dominantes (HEX):** `#A5A58D` (Bege acinzentado), `#B7B7A4` (Areia), `#333333` (Grafite).
- **Alt Text Sugerido:** "Detalhe do ambiente e postura profissional, com iluminação suave e fundo desfocado."

### 🎬 `03-video-hero.mp4`
- **Papel no site:** Background do Hero (com fallback de imagem para mobile) ou Transição Cinematográfica entre seções.
- **Luz e Humor:** Movimento fluido, slow motion, transmitindo dinamismo e alta produção.
- **Composição:** Movimento horizontal ou de aproximação lenta, ideal para efeito parallax ou zoom progressivo controlado por scroll.
- **Observação Técnica:** Comprimir para formato `.mp4` ou `.webm`, sem áudio, loop infinito, máximo 10-15MB para performance.

---

## 2. Direção de Arte Consolidada

### 🎨 Paleta de Cores (Derivada das Mídias)
1. **Primária (Fundo/Base):** `#FAEDCD` (Creme / Off-white) - Transmite elegância e respiro.
2. **Secundária (Destaque):** `#D4A373` (Dourado Terroso) - Sofisticação sem ser clichê.
3. **Texto Principal:** `#333333` (Grafite Profundo) - Legibilidade premium, menos agressivo que preto puro.
4. **Texto Secundário:** `#6B705C` (Verde Oliva Acinzentado) - Para subtítulos e detalhes.
5. **Acento:** `#CB997E` (Terracota Suave) - Para microinterações e hovers.

### 🔤 Sugestão Tipográfica
- **Títulos (Display):** *Playfair Display* ou *Cinzel* (Serifada, elegante, editorial, para títulos gigantes e impactantes).
- **Corpo de Texto:** *Inter* ou *Manrope* (Sans-serif, limpa, altamente legível, moderna).

### 🎬 Conceito Cinematográfico Central
**"Revelação Progressiva"**: O site não é apenas rolado, ele é *descoberto*. O hero começa com um zoom lento (scale) no vídeo/imagem de fundo. Conforme o usuário rola, a imagem não apenas sobe; ela revela camadas de texto que entram com `clip-path` ou `fade-up` suave, enquanto a próxima seção emerge por trás com uma transição de cor de fundo (do creme para o grafite, por exemplo).

### 🎯 Momentos de Movimento (Scroll)
1. **Hero:** Zoom lento e contínuo no background (video/imagem) + texto com revelação suave (staggered reveal).
2. **Transição entre Hero e Sobre:** A imagem `02-secundaria.jpg` se torna "sticky" (fixa) no lado direito, enquanto o texto editorial rola pelo lado esquerdo.
3. **Momento "Caramba!":** Na transição para a galeria, a tela escurece suavemente e as imagens da galeria entram em um grid assimétrico com um leve efeito parallax individual ao rolar.

---

## 3. Regras de Implementação para o Coder
- Usar SOMENTE os nomes de arquivo listados acima.
- Aplicar `loading="lazy"` em todas as imagens abaixo da dobra.
- Garantir `prefers-reduced-motion` para desativar parallax/zoom se o usuário solicitar.
- O vídeo deve ter o atributo `muted autoplay loop playsinline`.
