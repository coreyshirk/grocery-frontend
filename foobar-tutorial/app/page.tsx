import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <LeafIcon className="h-6 w-6" />
          <span className="sr-only">Grocery Foods</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Reviews
          </Link>
          <Link
            href="/sign-in"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Sign In
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="Fresh Produce"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Fresh, Healthy Groceries!
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover the best quality produce, meats, and pantry items
                    at our modern grocery store.
                  </p>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="flex flex-col items-center justify-center px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Our Best Sellers
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out our most popular and top-rated grocery items.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
                  <img
                    src="/placeholder.svg"
                    width="200"
                    height="200"
                    alt="Organic Apples"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                  />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Organic Apples</h3>
                    <p className="text-muted-foreground">
                      Fresh, crisp apples grown without pesticides.
                    </p>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                    </div>
                    <div className="font-medium">$3.99/lb</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <img
                    src="/placeholder.svg"
                    width="200"
                    height="200"
                    alt="Grass-Fed Beef"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                  />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Grass-Fed Beef</h3>
                    <p className="text-muted-foreground">
                      Lean, flavorful beef from pasture-raised cows.
                    </p>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                    </div>
                    <div className="font-medium">$9.99/lb</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <img
                    src="/placeholder.svg"
                    width="200"
                    height="200"
                    alt="Organic Kale"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                  />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Organic Kale</h3>
                    <p className="text-muted-foreground">
                      Nutrient-dense, fresh kale grown without chemicals.
                    </p>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                    </div>
                    <div className="font-medium">$2.99/bunch</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Products
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our latest and greatest grocery items.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <img
                    src="/placeholder.svg"
                    width="200"
                    height="200"
                    alt="Organic Blueberries"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                  />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Organic Blueberries</h3>
                    <p className="text-muted-foreground">
                      Juicy, antioxidant-rich blueberries grown without
                      pesticides.
                    </p>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                    </div>
                    <div className="font-medium">$4.99/pint</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <img
                    src="/placeholder.svg"
                    width="200"
                    height="200"
                    alt="Organic Eggs"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                  />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Organic Eggs</h3>
                    <p className="text-muted-foreground">
                      Cage-free, nutrient-rich eggs from happy hens.
                    </p>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                    </div>
                    <div className="font-medium">$5.99/dozen</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <img
                    src="/placeholder.svg"
                    width="200"
                    height="200"
                    alt="Organic Salmon"
                    className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center"
                  />
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">Organic Salmon</h3>
                    <p className="text-muted-foreground">
                      Wild-caught, sustainably sourced salmon fillets.
                    </p>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                    </div>
                    <div className="font-medium">$14.99/lb</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="flex flex-col items-center justify-center px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied customers about their experience with
                  Fresh Grocer.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
              <Card>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 text-center">
                    <h3 className="text-xl font-bold">John Doe</h3>
                    <p className="text-muted-foreground">
                      "The freshest produce I've ever had. I'm so glad I found
                      Fresh Grocer!"
                    </p>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function LeafIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
