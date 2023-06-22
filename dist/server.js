'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const app_1 = __importDefault(require('./app'));
process.on('uncaughtException', err => {
  console.log('uncaught exception is detected ', err);
  process.exit(1);
});
let server;
function bootstrap() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      server = app_1.default.listen(5000, () => {
        console.log('server is running port 5000');
      });
    } catch (err) {
      console.log(err);
    }
    process.on('unhandledRejection', err => {
      console.log(
        'unhandled rejection is detected, we are closing server',
        err
      );
      if (server) {
        server.close(() => {
          console.log(err);
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  });
}
bootstrap();
//sigterm
process.on('SIGTERM', () => {
  console.log('SIGTERM IS RECEIVED...');
  if (server) {
    server.close();
  }
});
