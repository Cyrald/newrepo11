import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SupportChatWidget } from "@/components/support-chat-widget"
import { useChatStore } from "@/stores/chatStore"
import { useAuthStore } from "@/stores/authStore"

export function SupportChatLauncher() {
  const isOpen = useChatStore((state) => state.isOpen)
  const openChat = useChatStore((state) => state.openChat)
  const closeChat = useChatStore((state) => state.closeChat)
  const user = useAuthStore((state) => state.user)
  
  // Don't show chat for staff (admin, marketer, consultant)
  const hasStaffRole = user?.roles && user.roles.some(role => 
    ['admin', 'marketer', 'consultant'].includes(role)
  )

  // Only show for authenticated non-staff users
  if (!user || hasStaffRole) {
    return null
  }

  const toggleChat = () => {
    if (isOpen) {
      closeChat()
    } else {
      openChat()
    }
  }

  return (
    <>
      {/* Floating Chat Button - Always visible, toggles open/close */}
      <Button
        onClick={toggleChat}
        size="icon"
        className="!fixed bottom-6 right-6 h-[52px] w-[52px] rounded-full shadow-lg hover:shadow-xl transition-all !z-[9999] bg-primary hover:bg-primary/90"
        aria-label={isOpen ? "Закрыть чат поддержки" : "Открыть чат поддержки"}
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </Button>

      {/* Chat Widget */}
      <SupportChatWidget isOpen={isOpen} onClose={closeChat} />
    </>
  )
}
