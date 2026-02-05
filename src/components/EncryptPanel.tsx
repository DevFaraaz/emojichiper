 import { useState } from 'react';
 import { motion, AnimatePresence } from 'framer-motion';
 import { Lock, Copy, Check, Sparkles } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Textarea } from '@/components/ui/textarea';
 import { encryptMessage } from '@/lib/encryption';
 import { toast } from 'sonner';
 
 export function EncryptPanel() {
   const [message, setMessage] = useState('');
  const [emojiOutput, setEmojiOutput] = useState('');
   const [copied, setCopied] = useState(false);
   const [isEncrypting, setIsEncrypting] = useState(false);
 
   const handleEncrypt = async () => {
     if (!message.trim()) {
       toast.error('Please enter a message to encrypt!');
       return;
     }
 
     setIsEncrypting(true);
     
     // Add a small delay for visual effect
     await new Promise(resolve => setTimeout(resolve, 500));
     
    const emojis = encryptMessage(message);
    setEmojiOutput(emojis);
     setIsEncrypting(false);
    toast.success('Message converted to emojis!');
   };
 
   const handleCopy = async () => {
    await navigator.clipboard.writeText(emojiOutput);
     setCopied(true);
    toast.success('Emojis copied!');
     setTimeout(() => setCopied(false), 2000);
   };
 
   return (
     <div className="space-y-6">
       <div className="flex items-center gap-3">
         <div className="p-2 rounded-xl bg-primary/10">
           <Lock className="w-5 h-5 text-primary" />
         </div>
        <div>
          <h2 className="text-xl font-semibold">Encode to Emojis</h2>
          <p className="text-sm text-muted-foreground">Your message becomes a string of emojis</p>
        </div>
       </div>
 
       <div className="space-y-2">
         <label className="text-sm font-medium text-muted-foreground">Your secret message</label>
         <Textarea
           placeholder="Type your message here..."
           value={message}
           onChange={(e) => setMessage(e.target.value)}
           className="min-h-[120px] resize-none bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary transition-colors"
         />
       </div>
 
       <Button
         onClick={handleEncrypt}
        disabled={!message.trim() || isEncrypting}
         className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-primary-foreground font-medium py-6"
       >
         <AnimatePresence mode="wait">
           {isEncrypting ? (
             <motion.div
               key="encrypting"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               className="flex items-center gap-2"
             >
               <Sparkles className="w-4 h-4 animate-pulse-glow" />
              Converting...
             </motion.div>
           ) : (
             <motion.div
               key="encrypt"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               className="flex items-center gap-2"
             >
               <Lock className="w-4 h-4" />
              Convert to Emojis ✨
             </motion.div>
           )}
         </AnimatePresence>
       </Button>
 
       <AnimatePresence>
        {emojiOutput && (
           <motion.div
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             exit={{ opacity: 0, height: 0 }}
             className="space-y-3 overflow-hidden"
           >
            <label className="text-sm font-medium text-success">Your emoji message</label>
             <div className="relative">
              <div className="p-4 rounded-xl bg-success/10 border border-success/20 text-2xl leading-relaxed break-all">
                {emojiOutput}
               </div>
               <Button
                 size="icon"
                 variant="ghost"
                 onClick={handleCopy}
                 className="absolute top-2 right-2 hover:bg-success/20"
               >
                 {copied ? (
                   <Check className="w-4 h-4 text-success" />
                 ) : (
                   <Copy className="w-4 h-4 text-muted-foreground" />
                 )}
               </Button>
             </div>
             <p className="text-xs text-muted-foreground text-center">
              Share these emojis! Paste them in the Decode tab to reveal the message.
             </p>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 }