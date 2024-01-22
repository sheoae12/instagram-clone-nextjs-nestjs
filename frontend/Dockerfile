# 이미지의 베이스를 지정합니다.
FROM node:21

# 앱을 실행할 디렉터리를 설정합니다.
WORKDIR /usr/src/app

# 패키지 매니저를 설치합니다. (pnpm 사용)
RUN npm install -g pnpm

# package.json 및 pnpm-lock.yaml을 복사하여 의존성을 인스톨합니다.
COPY package*.json pnpm-lock.yaml ./
RUN pnpm install

# 소스 코드를 복사합니다.
COPY . .
COPY .env.local .

# Next.js 앱을 빌드합니다.
RUN pnpm run build

# 앱을 실행합니다.
CMD ["pnpm", "start"]