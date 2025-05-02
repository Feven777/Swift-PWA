<<<<<<< HEAD
import { Supermarkets } from "@/components/supermarkets/supermarkets"
import { SupermarketsHeader } from "@/components/supermarkets/supermarkets-header"
=======
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Clock, MapPin, Plus } from "lucide-react"
import { searchItems } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
>>>>>>> 05e7f78e9be12a22443ecc84d308babbcc34a0ba

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string }
}) {
<<<<<<< HEAD
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <SupermarketsHeader initialQuery={searchParams.q} />
      <Supermarkets />
=======
  const query = searchParams.q || ""
  const { products, supermarkets } = searchItems(query)
  const hasResults = products.length > 0 || supermarkets.length > 0

  return (
    <main className="min-h-screen bg-[#f9f7f2]">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

        <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100 rounded-lg"></div>}>
          {hasResults ? (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Results ({products.length + supermarkets.length})</TabsTrigger>
                <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
                <TabsTrigger value="supermarkets">Supermarkets ({supermarkets.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                {supermarkets.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Supermarkets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {supermarkets.map((store) => (
                        <Link href={`/store/${store.id}`} key={store.id} className="block">
                          <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex p-4">
                              <div className="flex-shrink-0 mr-4">
                                <Image
                                  src={store.image || "/placeholder.svg"}
                                  alt={store.name}
                                  width={80}
                                  height={80}
                                  className="rounded-md object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">{store.name}</h3>
                                <div className="flex items-center mt-1 text-sm">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  <span className="ml-1 text-gray-700">
                                    {store.rating} ({store.ratingCount}+ ratings)
                                  </span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{store.deliveryTime}</span>
                                  <span className="mx-1">•</span>
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{store.distance}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {products.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="relative">
                            {product.discount && (
                              <Badge className="absolute top-2 right-2 bg-yellow-400 text-black">
                                {product.discount}
                              </Badge>
                            )}
                            <div className="p-4 flex justify-center">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={160}
                                height={160}
                                className="object-contain h-36 w-36"
                              />
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-sm">{product.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{product.supermarket}</p>
                            <div className="mt-2 flex items-center">
                              <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
                              <span className="ml-2 text-black font-bold">{product.salePrice}</span>
                            </div>
                            <div className="mt-3 flex justify-between items-center">
                              <button className="text-gray-400 hover:text-gray-600">
                                <Plus className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="products">
                {products.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="relative">
                          {product.discount && (
                            <Badge className="absolute top-2 right-2 bg-yellow-400 text-black">
                              {product.discount}
                            </Badge>
                          )}
                          <div className="p-4 flex justify-center">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={160}
                              height={160}
                              className="object-contain h-36 w-36"
                            />
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-sm">{product.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{product.supermarket}</p>
                          <div className="mt-2 flex items-center">
                            <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
                            <span className="ml-2 text-black font-bold">{product.salePrice}</span>
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <button className="text-gray-400 hover:text-gray-600">
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center py-12">
                        <h2 className="text-xl font-medium mb-4">No products found for "{query}"</h2>
                        <p className="text-gray-500 mb-6">Try searching for something else or browse our categories</p>
                        <Button className="bg-green-600 hover:bg-green-700">Browse Categories</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="supermarkets">
                {supermarkets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {supermarkets.map((store) => (
                      <Link href={`/store/${store.id}`} key={store.id} className="block">
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex p-4">
                            <div className="flex-shrink-0 mr-4">
                              <Image
                                src={store.image || "/placeholder.svg"}
                                alt={store.name}
                                width={80}
                                height={80}
                                className="rounded-md object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{store.name}</h3>
                              <div className="flex items-center mt-1 text-sm">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                <span className="ml-1 text-gray-700">
                                  {store.rating} ({store.ratingCount}+ ratings)
                                </span>
                              </div>
                              <div className="flex items-center mt-1 text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{store.deliveryTime}</span>
                                <span className="mx-1">•</span>
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>{store.distance}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center py-12">
                        <h2 className="text-xl font-medium mb-4">No supermarkets found for "{query}"</h2>
                        <p className="text-gray-500 mb-6">Try searching for something else</p>
                        <Button className="bg-green-600 hover:bg-green-700">View All Supermarkets</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <h2 className="text-xl font-medium mb-4">No results found for "{query}"</h2>
                  <p className="text-gray-500 mb-6">Try searching for something else or browse our categories</p>
                  <Button className="bg-green-600 hover:bg-green-700">Browse Categories</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </Suspense>
      </div>
      <Footer />
>>>>>>> 05e7f78e9be12a22443ecc84d308babbcc34a0ba
    </main>
  )
}
