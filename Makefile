.PHONY: all backend frontend down clean

all: 
	docker compose up backend --build --detach
	docker compose up frontend database --detach

backend:
	docker compose up database backend --build

backend-integration-tests:
	docker compose up backend-integration-tests 

frontend:
	docker compose up frontend
	
down:
	docker compose down

clean:
	docker compose down --volumes --remove-orphans
	docker image rm taskopia-backend taskopia-frontend taskopia-database