import "reflect-metadata";
import { Container, type interfaces } from "inversify";

export const container = new Container();

export function bindIdentifier<T>(
  identifier: interfaces.ServiceIdentifier<T>,
  instance: interfaces.Newable<T>,
) {
  container.bind(identifier).to(instance).inSingletonScope();
}

export function bindSelf<T>(instance: interfaces.Newable<T>) {
  container.bind(instance).toSelf().inSingletonScope();
}
