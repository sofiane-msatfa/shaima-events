import { bindIdentifier, bindSelf } from "./container.js";
import { IDENTIFIER } from "./identifiers.js";

import { AuthController } from "@/presentation/http/controller/auth-controller.js";
import { UserController } from "@/presentation/http/controller/user-controller.js";
import { AuthConcreteService } from "@/usecase/concrete/auth-concrete-service.js";
import { UserMongoRepository } from "@/infrastructure/database/mongo/repository/user-mongo-repository.js";
import { UserMemoryRepository } from "@/infrastructure/database/memory/user-memory-repository.js";

export function bindDependencies(): void {
  // bindIdentifier(IDENTIFIER.UserRepository, UserMongoRepository);
  bindIdentifier(IDENTIFIER.UserRepository, UserMemoryRepository);
  bindIdentifier(IDENTIFIER.AuthService, AuthConcreteService);
  bindSelf(UserController);
  bindSelf(AuthController)
}
