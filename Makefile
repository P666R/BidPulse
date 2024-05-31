build:
	docker compose -f docker-compose.yml up --build -d --remove-orphans

up:
	docker compose -f docker-compose.yml up -d

down:
	docker compose -f docker-compose.yml down

down-v:
	docker compose -f docker-compose.yml down -v

show-logs:
	docker compose -f docker-compose.yml logs

show-logs-app:
	docker compose -f docker-compose.yml logs app

show-logs-db:
	docker compose -f docker-compose.yml logs db

migrate:
	docker compose exec app npx prisma migrate dev --name init
	
generate:
	docker compose exec app npx prisma generate

sh-app:
	docker exec -it bidding-platform-app sh

sh-db:
	docker exec -it bidding-platform-db sh

sh-adminer:
	docker exec -it bidding-platform-adminer sh

clean:
	docker system prune

user:
	docker run --rm bidding-platform-app whoami
