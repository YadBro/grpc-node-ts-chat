import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import type { ProtoGrpcType } from './protos/chat';
import readline from 'readline';
import type { ChatResponse } from './protos/chatPackage/ChatResponse';

const PORT = 8082;
const PROTOPATH = path.resolve(__dirname, './protos/chat.proto');

const packageDef = protoLoader.loadSync(PROTOPATH);
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const client = new grpcObj.chatPackage.ChatService(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  onClientReady();
});

function onClientReady() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userName = process.argv[2];

  if (!userName) console.error("No userName, can't join chat"), process.exit();

  const metadata = new grpc.Metadata();
  metadata.set('userName', userName);
  const call = client.Chat(metadata);

  call.write({ message: 'Register' });

  call.on('data', (chunk) => {
    console.log(`${chunk.userName} ==> ${chunk.message}`);
  });

  rl.on('line', (line) => {
    if (line === 'quit') {
      call.end();
      process.exit();
    } else {
      call.write({ message: line });
    }
  });
}

