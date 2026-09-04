export const generateTitle = text => {
  let title = text.trim();

  if (title.length > 34) {
    title = title.substring(0, 34) + '...';
  }

  return title || 'New conversation';
};


export const createMessage = (role, text) => {
  return {
    id: `${Date.now()}-${Math.random()}`,
    role,
    text,
  };
};


export const createChatId = () => {
  return `${Date.now()}-${Math.random()}`;
};


export const sortConversations = conversations => {
  return [...conversations].sort(
    (a, b) => b.updatedAt - a.updatedAt
  );
};