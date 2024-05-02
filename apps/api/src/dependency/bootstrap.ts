import { bindSelf, container } from "./container.js";
import { IDENTIFIER } from "./identifiers.js";
import { bindIdentifier } from "./container.js";
import { EventRepository } from "@/infrastructure/database/mongo/repository/event.js";
import { EventController } from "@/presentation/http/controller/event.js";
import { UserController } from "@/presentation/http/controller/user.js";
import { UserRepository } from "@/infrastructure/database/mongo/repository/user.js";
import { AuthController } from "@/presentation/http/controller/auth.js";
import { VerifySignUp } from "@/presentation/http/middleware/verify-sign-up.js";
import { SignInUseCase } from "@/usecase/signInUseCase.js";
import { SignUpUseCase } from "@/usecase/signUpUseCase.js";
import { UserService } from "@/usecase/userService.js";

export function bindDependencies(): void {
  bindSelf(AuthController)
  bindSelf(EventController);
  bindSelf(UserController);
  bindSelf(VerifySignUp);
  bindSelf(UserService);
  bindIdentifier(IDENTIFIER.UserRepository, UserRepository);
  bindIdentifier(IDENTIFIER.EventRepository, EventRepository);
  bindIdentifier(IDENTIFIER.SignInUseCase, SignInUseCase);
  bindIdentifier(IDENTIFIER.SignUpUseCase, SignUpUseCase);
}
