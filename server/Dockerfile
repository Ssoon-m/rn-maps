# Node.js LTS 이미지를 베이스로 사용
FROM node:18-alpine

# 컨테이너 내 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 전체 프로젝트 복사
COPY . .

# NestJS 애플리케이션 빌드
RUN npm run build

# NestJS 앱이 사용하는 포트
EXPOSE 3030

# 애플리케이션 실행 명령
CMD ["npm", "run", "start:dev"]
