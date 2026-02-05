 import { motion } from 'framer-motion';
 import { EMOJI_OPTIONS } from '@/lib/encryption';
 
 interface EmojiPickerProps {
   selectedEmoji: string;
   onSelect: (emoji: string) => void;
 }
 
 export function EmojiPicker({ selectedEmoji, onSelect }: EmojiPickerProps) {
   return (
     <div className="space-y-3">
       <p className="text-sm font-medium text-muted-foreground">Choose your secret emoji key</p>
       <div className="grid grid-cols-6 gap-2">
         {EMOJI_OPTIONS.map((emoji) => (
           <motion.button
             key={emoji}
             whileHover={{ scale: 1.15 }}
             whileTap={{ scale: 0.95 }}
             onClick={() => onSelect(emoji)}
             className={`
               text-2xl p-2 rounded-lg transition-all duration-200
               ${selectedEmoji === emoji 
                 ? 'bg-primary/20 ring-2 ring-primary shadow-md' 
                 : 'hover:bg-muted'
               }
             `}
           >
             {emoji}
           </motion.button>
         ))}
       </div>
       {selectedEmoji && (
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex items-center justify-center gap-2 pt-2"
         >
           <span className="text-sm text-muted-foreground">Selected key:</span>
           <span className="emoji-display">{selectedEmoji}</span>
         </motion.div>
       )}
     </div>
   );
 }