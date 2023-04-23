// Original file: protos/chat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ChatRequest as _chatPackage_ChatRequest, ChatRequest__Output as _chatPackage_ChatRequest__Output } from '../chatPackage/ChatRequest';
import type { ChatResponse as _chatPackage_ChatResponse, ChatResponse__Output as _chatPackage_ChatResponse__Output } from '../chatPackage/ChatResponse';

export interface ChatServiceClient extends grpc.Client {
  Chat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatPackage_ChatRequest, _chatPackage_ChatResponse__Output>;
  Chat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatPackage_ChatRequest, _chatPackage_ChatResponse__Output>;
  chat(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatPackage_ChatRequest, _chatPackage_ChatResponse__Output>;
  chat(options?: grpc.CallOptions): grpc.ClientDuplexStream<_chatPackage_ChatRequest, _chatPackage_ChatResponse__Output>;
  
}

export interface ChatServiceHandlers extends grpc.UntypedServiceImplementation {
  Chat: grpc.handleBidiStreamingCall<_chatPackage_ChatRequest__Output, _chatPackage_ChatResponse>;
  
}

export interface ChatServiceDefinition extends grpc.ServiceDefinition {
  Chat: MethodDefinition<_chatPackage_ChatRequest, _chatPackage_ChatResponse, _chatPackage_ChatRequest__Output, _chatPackage_ChatResponse__Output>
}
