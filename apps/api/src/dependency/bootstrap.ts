import { bindIdentifier, bindSelf } from "./container.js";
import { IDENTIFIER } from "./identifiers.js";

import { AuthController } from "@/presentation/http/controller/auth-controller.js";
import { UserController } from "@/presentation/http/controller/user-controller.js";
import { AuthConcreteService } from "@/usecase/concrete/auth-concrete-service.js";
import { UserMemoryRepository } from "@/infrastructure/database/memory/user-memory-repository.js";
import { EventMongoRepository } from "@/infrastructure/database/mongo/repository/event-mongo-repository.js";
import { EventController } from "@/presentation/http/controller/event-controller.js";

export function bindDependencies(): void {
  // bindIdentifier(IDENTIFIER.UserRepository, UserMongoRepository);
  bindIdentifier(IDENTIFIER.UserRepository, UserMemoryRepository);
  bindIdentifier(IDENTIFIER.AuthService, AuthConcreteService);
  bindIdentifier(IDENTIFIER.EventRepository, EventMongoRepository);
  bindSelf(UserController);
  bindSelf(AuthController);
  bindSelf(EventController);
}
