// Export all entities without importing them
export { User } from './User';
export { Bot } from './Bot';
export { BotAssignment } from './BotAssignment';
export { Conversation } from './Conversation';
export { Subscription } from './Subscription';
export { BillingPlan } from './BillingPlan';
export { Invoice } from './Invoice';
export { ChatbotIssue } from './ChatbotIssue';

// Export as array for TypeORM
import { User } from './User';
import { Bot } from './Bot';
import { BotAssignment } from './BotAssignment';
import { Conversation } from './Conversation';
import { Subscription } from './Subscription';
import { BillingPlan } from './BillingPlan';
import { Invoice } from './Invoice';
import { ChatbotIssue } from './ChatbotIssue';

export const entities = [
  User,
  Bot,
  BotAssignment,
  Conversation,
  Subscription,
  BillingPlan,
  Invoice,
  ChatbotIssue
];
