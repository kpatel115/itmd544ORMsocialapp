import { createSchema } from 'graphql-yoga'
import { DateTimeResolver } from 'graphql-scalars'
import { Context } from './context'

export const typeDefs = `
  type User {
    user_id: Int!
    name: String!
    email: String!
    posts: [Post!]!
    comments: [Comment!]!
  }
  
  type Post {
    post_id: Int!
    title: String!
    content: String
    created_at: DateTime
    updated_at: DateTime
    published: Boolean
    view_count: Int
    author: User!
    author_id: Int
    comments: [Comment!]!
  }
  
  type Comment {
    comment_id: Int!
    title: String!
    content: String
    created_at: DateTime
    updated_at: DateTime
    published: Boolean
    view_count: Int
    commenter: User!
    commenter_id: Int
    commented_post: Post!
    commented_post_id: Int
  }
  
  type Query {
    getUsers: [User!]!
    getUserById(id: Int!): User
    getPosts: [Post!]!
    getPostById(id: Int!): Post
    getComments: [Comment!]!
    getCommentById(id: Int!): Comment
  }
  
  type Mutation {
    createDraft(authorEmail: String!, data: PostCreateInput!): Post
    incrementPostViewCount(id: Int!): Post
    signupUser(data: UserCreateInput!): User!
    togglePublishPost(id: Int!): Post
    createUser(name: String!, email: String!): User!
    updateUser(id: Int!, name: String, email: String): User
    deleteUser(id: Int!): User
    createPost(title: String!, content: String, author_id: Int!): Post!
    updatePost(id: Int!, title: String, content: String): Post
    deletePost(id: Int!): Post
    createComment(title: String!, content: String, commenter_id: Int!, commentedPostId: Int!): Comment!
    updateComment(id: Int!, title: String, content: String): Comment
    deleteComment(id: Int!): Comment
  }

  input PostCreateInput {
    content: String
    title: String!
  }
  input PostUpdateInput {
    title: String
    content: String
    published: Boolean
    # Add other fields as needed for update
  }

  input PostOrderByUpdatedAtInput {
    updatedAt: SortOrder!
  }

  type Query {
    allUsers: [User!]!
    getPosts: [Post!]!
    getComments: [Comment!]!
    getUser(id: Int): User
    draftsByUser(userUniqueInput: UserUniqueInput!): [Post]
    feed(
      orderBy: PostOrderByUpdatedAtInput
      searchString: String
      skip: Int
      take: Int
    ): [Post!]!
    postById(id: Int): Post
  }

  enum SortOrder {
    asc
    desc
  }

  input UserCreateInput {
    email: String!
    name: String
    posts: [PostCreateInput!]
  }

  input UserUniqueInput {
    email: String
    id: Int
  }

  scalar DateTime
`

export const resolvers = {
  Query: {
    getPosts: (_parent, _args, context: Context) => {
      return context.prisma.post.findMany()
    },
    getComments: (_parent, _args, context: Context) => {
      return context.prisma.comment.findMany()
    },
    getUser: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.user.findUnique({
        where: { user_id: args.id || undefined },
      })
    },
    allUsers: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany()
    },
    postById: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.findUnique({
        where: { post_id: args.id || undefined },
      })
    },
    feed: (
      _parent,
      args: {
        searchString: string
        skip: number
        take: number
        orderBy: PostOrderByUpdatedAtInput
      },
      context: Context,
    ) => {
      const or = args.searchString
        ? {
            OR: [
              { title: { contains: args.searchString } },
              { content: { contains: args.searchString } },
            ],
          }
        : {}

      return context.prisma.post.findMany({
        where: {
          published: true,
          ...or,
        },
        take: args?.take,
        skip: args?.skip,
        // orderBy: args?.orderBy,
      })
    },
    draftsByUser: (
      _parent,
      args: { userUniqueInput: UserUniqueInput },
      context: Context,
    ) => {
      return context.prisma.user
        .findUnique({
          where: {
            user_id: args.userUniqueInput.id || undefined,
            email: args.userUniqueInput.email || undefined,
          },
        })
        .posts({
          where: {
            published: false,
          },
        })
    },
  },
  Mutation: {
    signupUser: (
      _parent,
      args: { data: UserCreateInput },
      context: Context,
    ) => {
      const postData = args.data.posts?.map((post) => {
        return { title: post.title, content: post.content || undefined }
      })

      return context.prisma.user.create({
        data: {
          name: args.data.name,
          email: args.data.email,
          posts: {
            create: postData,
          },
        },
      })
    },
    createDraft: (
      _parent,
      args: { data: PostCreateInput; authorEmail: string },
      context: Context,
    ) => {
      return context.prisma.post.create({
        data: {
          title: args.data.title,
          content: args.data.content,
          author: {
            connect: { email: args.authorEmail },
          },
        },
      })
    },
    togglePublishPost: async (
      _parent,
      args: { id: number },
      context: Context,
    ) => {
      try {
        const post = await context.prisma.post.findUnique({
          where: { post_id: args.id || undefined },
          select: {
            published: true,
          },
        })

        return context.prisma.post.update({
          where: { post_id: args.id || undefined },
          data: { published: !post?.published },
        })
      } catch (error) {
        throw new Error(
          `Post with ID ${args.id} does not exist in the database.`,
        )
      }
    },
    incrementPostViewCount: (
      _parent,
      args: { id: number },
      context: Context,
    ) => {
      return context.prisma.post.update({
        where: { post_id: args.id || undefined },
        data: {
          viewCount: {
            increment: 1,
          },
        },
      })
    },
    updatePost: async (_parent, args, context) => {
      const { id, data } = args;
      // Logic to update the post with the provided ID and data
      const updatedPost = await context.prisma.post.update({
        where: { id },
        data,
      });
      return updatedPost;
    },
    deletePost: (_parent, args: { id: number }, context: Context) => {
      return context.prisma.post.delete({
        where: { post_id: args.id },
      })
    },
  },
  DateTime: DateTimeResolver,
  Post: {
    author: (parent, _args, context: Context) => {
      return context.prisma.post
        .findUnique({
          where: { post_id: parent?.id },
        })
        .author()
    },
  },
  User: {
    posts: (parent, _args, context: Context) => {
      return context.prisma.user
        .findUnique({
          where: { user_id: parent?.id },
        })
        .posts()
    },
  },
}

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

interface PostOrderByUpdatedAtInput {
  updatedAt: SortOrder
}

interface UserUniqueInput {
  id?: number
  email?: string
}

interface PostCreateInput {
  title: string
  content?: string
}

interface UserCreateInput {
  email: string
  name?: string
  posts?: PostCreateInput[]
}

export const schema = createSchema({
  typeDefs,
  resolvers,
})