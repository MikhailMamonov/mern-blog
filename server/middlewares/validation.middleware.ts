import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware<T extends object>(
  type: new () => T,
  skipMissingProperties = false
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const object = plainToInstance(type, req.body);
    validate(object, { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints || {}))
          .join(', ');
        res.status(400).json({ message: `Ошибка валидации: ${message}` });
      } else {
        req.body = object;
        next();
      }
    });
  };
}