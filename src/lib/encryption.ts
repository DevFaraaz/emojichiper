 // Emoji-based message encoding
 // The message is encoded INTO emojis - emojis ARE the encrypted message
 
 // Large set of emojis for encoding (256 emojis for byte mapping)
 export const ENCODING_EMOJIS = [
   '🌀', '🌁', '🌂', '🌃', '🌄', '🌅', '🌆', '🌇', '🌈', '🌉', '🌊', '🌋', '🌌', '🌍', '🌎', '🌏',
   '🌐', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '🌙', '🌚', '🌛', '🌜', '🌝', '🌞', '🌟',
   '🌠', '🌡', '🌤', '🌥', '🌦', '🌧', '🌨', '🌩', '🌪', '🌫', '🌬', '🌭', '🌮', '🌯', '🌰', '🌱',
   '🌲', '🌳', '🌴', '🌵', '🌶', '🌷', '🌸', '🌹', '🌺', '🌻', '🌼', '🌽', '🌾', '🌿', '🍀', '🍁',
   '🍂', '🍃', '🍄', '🍅', '🍆', '🍇', '🍈', '🍉', '🍊', '🍋', '🍌', '🍍', '🍎', '🍏', '🍐', '🍑',
   '🍒', '🍓', '🍔', '🍕', '🍖', '🍗', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍞', '🍟', '🍠', '🍡',
   '🍢', '🍣', '🍤', '🍥', '🍦', '🍧', '🍨', '🍩', '🍪', '🍫', '🍬', '🍭', '🍮', '🍯', '🍰', '🍱',
   '🍲', '🍳', '🍴', '🍵', '🍶', '🍷', '🍸', '🍹', '🍺', '🍻', '🍼', '🍽', '🍾', '🍿', '🎀', '🎁',
   '🎂', '🎃', '🎄', '🎅', '🎆', '🎇', '🎈', '🎉', '🎊', '🎋', '🎌', '🎍', '🎎', '🎏', '🎐', '🎑',
   '🎒', '🎓', '🎖', '🎗', '🎙', '🎚', '🎛', '🎞', '🎟', '🎠', '🎡', '🎢', '🎣', '🎤', '🎥', '🎦',
   '🎧', '🎨', '🎩', '🎪', '🎫', '🎬', '🎭', '🎮', '🎯', '🎰', '🎱', '🎲', '🎳', '🎴', '🎵', '🎶',
   '🎷', '🎸', '🎹', '🎺', '🎻', '🎼', '🎽', '🎾', '🎿', '🏀', '🏁', '🏂', '🏃', '🏄', '🏅', '🏆',
   '🏇', '🏈', '🏉', '🏊', '🏋', '🏌', '🏍', '🏎', '🏏', '🏐', '🏑', '🏒', '🏓', '🏔', '🏕', '🏖',
   '🏗', '🏘', '🏙', '🏚', '🏛', '🏜', '🏝', '🏞', '🏟', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦',
   '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🏰', '🏳', '🏴', '🏵', '🏷', '🏸', '🏹',
   '🏺', '🏻', '🏼', '🏽', '🏾', '🏿', '🐀', '🐁', '🐂', '🐃', '🐄', '🐅', '🐆', '🐇', '🐈', '🐉',
 ];
 
 // Create reverse lookup map
 const emojiToIndex = new Map<string, number>();
 ENCODING_EMOJIS.forEach((emoji, index) => {
   emojiToIndex.set(emoji, index);
 });
 
 // Encode message text into emoji sequence
 export function encryptMessage(message: string): string {
   // Convert message to UTF-8 bytes
   const encoder = new TextEncoder();
   const bytes = encoder.encode(message);
   
   // Map each byte to an emoji
   const emojis: string[] = [];
   for (const byte of bytes) {
     emojis.push(ENCODING_EMOJIS[byte]);
   }
   
   return emojis.join('');
 }
 
 // Parse emoji string into individual emojis using regex (cross-browser compatible)
 function parseEmojis(emojiString: string): string[] {
   // Regex pattern for matching emoji characters
   const emojiRegex = /\p{Emoji}/gu;
   const matches = emojiString.match(emojiRegex);
   return matches || [];
 }
 
 // Decode emoji sequence back to message
 export function decryptMessage(emojiSequence: string): { success: boolean; message: string } {
   try {
     const emojis = parseEmojis(emojiSequence.trim());
     
     if (emojis.length === 0) {
       return { success: false, message: '' };
     }
     
     const bytes: number[] = [];
     
     for (const emoji of emojis) {
       const index = emojiToIndex.get(emoji);
       if (index === undefined) {
         // Unknown emoji - not part of our encoding set
         return { success: false, message: '' };
       }
       bytes.push(index);
     }
     
     // Convert bytes back to string
     const decoder = new TextDecoder();
     const message = decoder.decode(new Uint8Array(bytes));
     
     return { success: true, message };
   } catch {
     return { success: false, message: '' };
   }
 }