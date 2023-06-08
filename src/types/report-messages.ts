import { z } from 'zod'

export const MessageType = z.enum(['PAGE_TRANSITION', 'SCROLLED'])
export type MessageType = z.infer<typeof MessageType>
export const MESSAGE_TYPE = MessageType.enum

export const TransitionMessage = z.object({
  type: z.literal(MESSAGE_TYPE.PAGE_TRANSITION),
  body: z.object({
    location: z.string()
  })
})
export type TransitionMessage = z.infer<typeof TransitionMessage>

export const ScrolledMessage = z.object({
  type: z.literal(MESSAGE_TYPE.SCROLLED),
  body: z.object({
    id: z.string()
  })
})
export type ScrolledMessage = z.infer<typeof ScrolledMessage>

export type ReportMessage = TransitionMessage | ScrolledMessage
