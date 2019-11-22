FROM node

LABEL maintainer="podgorniakj@example.com"

RUN npm install -g @angular/cli \
	&& npm install --save-dev @angular-devkit/build-angular \
	&& npm install @angular/compiler-cli \
	&& npm update

COPY mem-app /home/mem-app

WORKDIR "/home/mem-app"

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
