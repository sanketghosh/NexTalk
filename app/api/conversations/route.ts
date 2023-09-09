import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    /* getting the isGroup and members are important as in case of group chat it will be required */
    const { userId, isGroup, members, name } = body;

    /* checking if user is authorized */
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    /* checking if the group is true but other member data are not valid */
    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid data", { status: 400 });
    }

    /* for group chat */
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              /* separately add current user  */
              {
                id: currentUser.id,
              },
            ],
          },
        },
        /* it populates the users when we fetch the conversation otherwise it will give only ids*/
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }

    /* for single one to one chats */
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    /* extract */
    const singleConversations = existingConversations[0];

    if (singleConversations) {
      return NextResponse.json(singleConversations);
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
