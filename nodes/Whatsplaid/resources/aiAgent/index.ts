import type { INodeProperties } from 'n8n-workflow';

const promptUpdate = { resource: ['aiAgent'], operation: ['updatePrompt'] };
const conversationOperations = {
	resource: ['aiAgent'],
	operation: ['getConversationState', 'setConversationState'],
};

export const aiAgentDescription: INodeProperties[] = [
	{
		displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
		displayOptions: { show: { resource: ['aiAgent'] } },
		options: [
			{ name: 'Get Prompt', value: 'getPrompt', action: 'Get the editable AI agent prompt', routing: { request: { method: 'GET', url: '/ai-agent/prompt' } } },
			{ name: 'Update Prompt', value: 'updatePrompt', action: 'Update the editable AI agent prompt', routing: { request: { method: 'PATCH', url: '/ai-agent/prompt' } } },
			{ name: 'Get Conversation State', value: 'getConversationState', action: 'Get the conversation AI agent state', routing: { request: { method: 'GET', url: '=/conversations/{{$parameter.conversationId}}/ai-agent' } } },
			{ name: 'Set Conversation State', value: 'setConversationState', action: 'Set the conversation AI agent state', routing: { request: { method: 'PATCH', url: '=/conversations/{{$parameter.conversationId}}/ai-agent' } } },
		],
		default: 'getPrompt',
	},
	{
		displayName: 'Prompt', name: 'prompt', type: 'string', typeOptions: { rows: 8 }, required: true,
		default: '', displayOptions: { show: promptUpdate },
		routing: { send: { type: 'body', property: 'prompt' } },
	},
	{
		displayName: 'Expected Revision', name: 'expectedRevision', type: 'string', default: '',
		description: 'SHA-256 revision returned by Get Prompt, used to prevent accidental overwrites',
		displayOptions: { show: promptUpdate },
		routing: { send: { type: 'body', property: 'expected_revision' } },
	},
	{
		displayName: 'Conversation ID', name: 'conversationId', type: 'string', required: true, default: '',
		displayOptions: { show: conversationOperations },
	},
	{
		displayName: 'Active', name: 'active', type: 'boolean', default: true,
		description: 'Whether the AI agent should answer this conversation',
		displayOptions: { show: { resource: ['aiAgent'], operation: ['setConversationState'] } },
		routing: { send: { type: 'body', property: 'active' } },
	},
];
