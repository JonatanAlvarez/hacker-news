const howLongAgo = (publishedDate: Date):string => {
  const today = new Date();

  // if time is less than 24 hours
  if (publishedDate.toDateString() === today.toDateString()) {
    const time = Math.round(Math.abs(today.getTime() - publishedDate.getTime()) / (1000 * 60));
    
    if (time >= 60) {
      const hours = Math.round(time / 60); // Time in Hours

      return `${hours} ${(hours > 60 ? 'hours' : 'hour')} ago`;
    }

    return `${time} minutes ago`; // Time in minutes
  }

  return publishedDate.toDateString(); // Date complete
};

export default howLongAgo;