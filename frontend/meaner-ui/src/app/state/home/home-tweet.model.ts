export interface HomeTweet {
    content: string;
    authorName: string;
    authorId: string;
    id: string;
    date: Date;
    likes: number;
    liked: boolean;
    replies: number;
    shares: number;
    replyToId: string | null;
}