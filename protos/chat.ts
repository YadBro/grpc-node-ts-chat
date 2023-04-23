import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChatServiceClient as _chatPackage_ChatServiceClient, ChatServiceDefinition as _chatPackage_ChatServiceDefinition } from './chatPackage/ChatService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  chatPackage: {
    ChatRequest: MessageTypeDefinition
    ChatResponse: MessageTypeDefinition
    ChatService: SubtypeConstructor<typeof grpc.Client, _chatPackage_ChatServiceClient> & { service: _chatPackage_ChatServiceDefinition }
  }
}

