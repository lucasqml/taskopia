FROM maven:3.6.3-openjdk-17 as build
WORKDIR /code
COPY . /code

RUN mvn clean install -DskipTests

EXPOSE 8080

CMD ["mvn", "spring-boot:run"]