import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { accountDescription } from './resources/account';
import { aiAgentDescription } from './resources/aiAgent';
import { contactDescription } from './resources/contact';
import { conversationDescription } from './resources/conversation';
import { handoffDescription } from './resources/handoff';
import { messageDescription } from './resources/message';
import { orderDescription } from './resources/order';
import { productDescription } from './resources/product';
import { ticketDescription } from './resources/ticket';

export class Whatsplaid implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Whatsplaid',
		name: 'whatsplaid',
		icon: { light: 'file:whatsplaid.svg', dark: 'file:whatsplaid.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Whatsplaid API',
		defaults: {
			name: 'Whatsplaid',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'whatsplaidApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.whatsplaid.com/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{ name: 'AI Agent', value: 'aiAgent' },
					{ name: 'Contact', value: 'contact' },
					{ name: 'Conversation', value: 'conversation' },
					{ name: 'Human Handoff', value: 'handoff' },
					{ name: 'Message', value: 'message' },
					{ name: 'Order', value: 'order' },
					{ name: 'Product', value: 'product' },
					{ name: 'Ticket', value: 'ticket' },
				],
				default: 'account',
			},
			...accountDescription,
			...aiAgentDescription,
			...contactDescription,
			...conversationDescription,
			...handoffDescription,
			...messageDescription,
			...orderDescription,
			...productDescription,
			...ticketDescription,
		],
	};
}
