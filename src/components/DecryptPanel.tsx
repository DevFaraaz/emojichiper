 import { useState } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 import { Unlock, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Textarea } from '@/components/ui/textarea';
 import { decryptMessage } from '@/lib/encryption';
 import { toast } from 'sonner';
 
 export function DecryptPanel() {
   const [emojiInput, setEmojiInput] = useState('');
   const [decryptedMessage, setDecryptedMessage] = useState('');
   const [decryptError, setDecryptError] = useState(false);
   const [isDecrypting, setIsDecrypting] = useState(false);
 
   const handleDecrypt = async () => {
     if (!emojiInput.trim()) {
       toast.error('Please paste the emoji message!');
       return;
     }
 
     setIsDecrypting(true);
     setDecryptedMessage('');
     setDecryptError(false);
     
     await new Promise(resolve => setTimeout(resolve, 500));
     
     const result = decryptMessage(emojiInput.trim());
     
     if (result.success) {
       setDecryptedMessage(result.message);
       toast.success('Message decoded!');
     } else {
       setDecryptError(true);
       toast.error('Could not decode these emojis!');
     }
     
     setIsDecrypting(false);
   };
 
   return (
     <div className="space-y-6">
       <div className="flex items-center gap-3">
         <div className="p-2 rounded-xl bg-accent/10">
           <Unlock className="w-5 h-5 text-accent" />
         </div>
         <div>
           <h2 className="text-xl font-semibold">Decode Emojis</h2>
           <p className="text-sm text-muted-foreground">Paste emojis to reveal the hidden message</p>
         </div>
       </div>
 
       <div className="space-y-2">
         <label className="text-sm font-medium text-muted-foreground">Paste the emoji message</label>
         <Textarea
           placeholder="🌷🌻🌹🌺🌸..."
           value={emojiInput}
           onChange={(e) => { setEmojiInput(e.target.value); setDecryptError(false); }}
           className="min-h-[120px] resize-none bg-background/50 backdrop-blur-sm border-border/50 focus:border-accent transition-colors text-2xl leading-relaxed"
         />
       </div>
 
       <Button
         onClick={handleDecrypt}
         disabled={!emojiInput.trim() || isDecrypting}
         className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 transition-opacity text-accent-foreground font-medium py-6"
       >
         <AnimatePresence mode="wait">
           {isDecrypting ? (
             <motion.div
               key="decrypting"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               className="flex items-center gap-2"
             >
               <Sparkles className="w-4 h-4 animate-pulse-glow" />
               Decoding...
             </motion.div>
           ) : (
             <motion.div
               key="decrypt"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               className="flex items-center gap-2"
             >
               <Unlock className="w-4 h-4" />
               Reveal Message 🔮
             </motion.div>
           )}
         </AnimatePresence>
       </Button>
 
       <AnimatePresence mode="wait">
         {decryptError && (
           <motion.div
             key="error"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 animate-shake"
           >
             <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
             <div>
               <p className="font-medium text-destructive">Invalid emoji sequence!</p>
               <p className="text-sm text-muted-foreground">Make sure you pasted the correct emojis from the Encode tab.</p>
             </div>
           </motion.div>
         )}
 
         {decryptedMessage && (
           <motion.div
             key="success"
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -10 }}
             className="space-y-3"
           >
             <div className="flex items-center gap-2 text-success">
               <CheckCircle2 className="w-4 h-4" />
               <label className="text-sm font-medium">Hidden message revealed!</label>
             </div>
             <div className="p-4 rounded-xl bg-success/10 border border-success/20">
               {decryptedMessage}
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 }