 import { motion } from 'framer-motion';
 import { EncryptPanel } from '@/components/EncryptPanel';
 import { DecryptPanel } from '@/components/DecryptPanel';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wand2, Eye, Shield } from 'lucide-react';
 
 const Index = () => {
   return (
     <div className="min-h-screen py-8 px-4 sm:py-12">
       {/* Decorative glow */}
       <div 
         className="fixed inset-0 pointer-events-none"
         style={{ background: 'var(--gradient-glow)' }}
       />
 
       <div className="max-w-2xl mx-auto relative">
         {/* Header */}
         <motion.header
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="text-center mb-8 sm:mb-12"
         >
           <div className="inline-flex items-center justify-center mb-4">
             <motion.div
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
               className="text-6xl sm:text-7xl"
             >
               🔐
             </motion.div>
           </div>
           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
             <span className="gradient-text">Emoji Cipher</span>
           </h1>
           <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
            Turn your secret messages into emoji strings. Share the emojis, paste them back to reveal the message!
           </p>
         </motion.header>
 
         {/* Main Card */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="card-elevated rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-border/50"
         >
           <Tabs defaultValue="encrypt" className="w-full">
             <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-xl">
               <TabsTrigger 
                 value="encrypt" 
                 className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all"
               >
                <Wand2 className="w-4 h-4" />
                Encode
               </TabsTrigger>
               <TabsTrigger 
                 value="decrypt"
                 className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all"
               >
                <Eye className="w-4 h-4" />
                Decode
               </TabsTrigger>
             </TabsList>
 
             <TabsContent value="encrypt" className="mt-0">
               <EncryptPanel />
             </TabsContent>
 
             <TabsContent value="decrypt" className="mt-0">
               <DecryptPanel />
             </TabsContent>
           </Tabs>
         </motion.div>
 
         {/* Footer */}
         <motion.footer
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.4 }}
           className="text-center mt-8 text-sm text-muted-foreground"
         >
           <div className="flex items-center justify-center gap-2">
             <Shield className="w-4 h-4" />
            <span>Client-side only. No data stored.</span>
           </div>
         </motion.footer>
       </div>
     </div>
   );
 };
 
 export default Index;
