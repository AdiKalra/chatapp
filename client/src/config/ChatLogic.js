export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i) => {
  return (
    i < messages.length &&
    ((messages[i + 1] === undefined &&
      messages[i - 1].sender._id !== m.sender._id) ||
      messages[i - 1] === undefined ||
      (messages[i - 1] !== undefined &&
        messages[i - 1].sender._id !== m.sender._id))
  );
};
