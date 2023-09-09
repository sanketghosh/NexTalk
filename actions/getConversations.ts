import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  /* not matching with current user id, return an empty array or nothing */
  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await prisma.conversation.findMany({
      /* ordering latest conversations by latest message sending in them */
      orderBy: {
        lastMessageAt: "desc",
      },

      /* 
      gonna load every single conversation that has current user that includes one to one and group chat conversations
      */
      where: {
        userIds: {
          has: currentUser.id,
        },
      },

      /* want to populate the users */
      include: {
        users: true,
        /* also want to populate the users inside those messages */
        messages: {
          include: {
            sender: true,
            /* users who have seen the messages */
            seen: true,
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
