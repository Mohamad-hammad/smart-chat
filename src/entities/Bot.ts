import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { BotAssignment } from './BotAssignment';
import { Conversation } from './Conversation';

@Entity('bots')
export class Bot {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 255 })
  domain!: string;

  @Column({ 
    type: 'enum', 
    enum: ['active', 'paused', 'inactive'], 
    default: 'active' 
  })
  status!: 'active' | 'paused' | 'inactive';

  @Column({ type: 'int', default: 0 })
  totalConversations!: number;

  @Column({ type: 'timestamp', nullable: true })
  lastActive?: Date;

  @Column({ type: 'uuid' })
  createdBy!: string; // Manager who created the bot

  @Column({ type: 'uuid', nullable: true })
  updatedBy?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @OneToMany('BotAssignment', 'bot')
  assignments?: BotAssignment[];

  @OneToMany('Conversation', 'bot')
  conversations?: Conversation[];
}
