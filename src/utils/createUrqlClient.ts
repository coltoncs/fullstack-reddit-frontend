import { dedupExchange, fetchExchange } from "urql";
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange } from '@urql/exchange-graphcache'

export const createUrqlClient = (ssrExchange: any) => (
  {
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: "include" as const
    },
    exchanges: [
      dedupExchange, 
      cacheExchange(
        {
          updates: {
            Mutation: {
              logout: (result, args, cache, info) => {
                betterUpdateQuery<LogoutMutation, MeQuery>(
                  cache,
                  { query: MeDocument },
                  result,
                  () => ({ me: null })
                )
              },
              login: (result, args, cache, info) => {
                betterUpdateQuery<LoginMutation, MeQuery>(
                  cache, 
                  {query: MeDocument}, 
                  result,
                  (res, query) => {
                    if (res.login.errors) {
                      return query
                    } else {
                      return {
                        me: res.login.user
                      }
                    }
                  }
                )
              },

              register: (result, args, cache, info) => {
                betterUpdateQuery<RegisterMutation, MeQuery>(
                  cache, 
                  {query: MeDocument}, 
                  result,
                  (res, query) => {
                    if (res.register.errors) {
                      return query
                    } else {
                      return {
                        me: res.register.user
                      }
                    }
                  }
                )
              }
            }
          }
        }
      ), 
      ssrExchange,
      fetchExchange
    ]
  }
)
