import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './lib/prisma';
import bcryptjs from 'bcryptjs';
 
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-accoutn',
  },

  callbacks:{
    jwt({ token, user }){

      if( user ){
        token.data = user;
      }

      return token
    },

    session({ session, token, user }){
      session.user = token.data as any;
      return session
    }

  },


  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(5) })
          .safeParse(credentials);

          if( !parsedCredentials.success ) return null
          
          const { email, password } = parsedCredentials.data
          
          console.log({email, password})

          //Buscar correo

          const user = await prisma.user.findUnique({where: { email: email.toLocaleLowerCase() }});

          if( !user ) return null;

          //Comparar contraseña

          if( !bcryptjs.compareSync( password, user.password ) ) return null;


          const { password: _, ...rest } = user;

          return rest;
      },
    }),
  ]
}


export const { signIn, signOut, auth, handlers } = NextAuth( authConfig )