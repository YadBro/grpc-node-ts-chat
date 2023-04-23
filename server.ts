import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import type { ChatServiceHandlers } from './protos/chatPackage/ChatService';
import type { ChatResponse } from './protos/chatPackage/ChatResponse';
import type { ProtoGrpcType } from './protos/chat';
import { ChatRequest } from './protos/chatPackage/ChatRequest';

const PORT = 8082;
const PROTOPATH = path.resolve(__dirname, './protos/chat.proto');

const packageDef = protoLoader.loadSync(PROTOPATH);
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const chatPackage = grpcObj.chatPackage;

async function main() {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Listening on port ${port}`);

      server.start();
    }
  );
}

const callByUserName = new Map<
  string,
  grpc.ServerDuplexStream<ChatRequest, ChatResponse>
>();

function getServer() {
  const server = new grpc.Server();

  server.addService(chatPackage.ChatService.service, {
    Chat: (call) => {
      call.on('data', (chunk) => {
        const userName = call.metadata.get('userName')[0] as string;
        const message = chunk.message;

        console.log(userName, message);

        for (let [user, userCall] of callByUserName) {
          if (userName !== user) {
            userCall.write({
              userName,
              message,
            });
          }
        }

        if (callByUserName.get(userName) === undefined) {
          callByUserName.set(userName, call);
        }
      });

      call.on('end', () => {
        const userName = call.metadata.get('username')[0] as string;
        callByUserName.delete(userName);

        for (let [user, userCall] of callByUserName) {
          userCall.write({
            userName,
            message: 'Has left the chat',
          });
        }

        console.log(`${userName} is ending their chat.`);

        call.write({
          userName: 'Server',
          message: `See you later ${userName}`,
        });

        call.end();
      });
    },
  } as ChatServiceHandlers);

  return server;
}

main();

