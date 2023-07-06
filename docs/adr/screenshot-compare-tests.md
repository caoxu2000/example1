# ADR: Screenshot Compare Test Setup Instructions

Screenshot comparison tests require slightly different setup than the other specs. This ADR will walk through the setup requirements to successfully create a screenshot comparison test.

1. Baseline images

First, there needs to be a baseline image to compare to before you take the secondary screenshot. To take a baseline image, the cypress environment variable `screenshotGoldenMode` must be set to true. If there is an existing baseline image with the same name, it must be manually deleted prior to running the takeAndCompareScreenshot command or else an error will be thrown. Then, running takeAndCompareScreenshot will create the new baseline image. These baseline images will be stored so unless the baseline images are deleted, they will not need to be retaken before each test.

2. Test images

Once the baseline images have been created, the `screenshotGoldenMode` environment variable must be set to false to indicate the the next pictures will be for comparisons. Running takeAndCompareScreenshot on an element that has an existing baseline image will take a new screenshot and compare it to the baseline image, failing if the difference between the two images is greater than the specified threshold. If a baseline image does not exist while running with `screenshotGoldenMode` set to false, the test will fail since there would be no existing image for the new screenshot to be compared to.

3. Screen size

Because the screenshots are being taken of the screen, it is imperative to be consistent with the size of the screen between taking baseline and test images to avoid tests failing due to differently sized images being compared. Additionally, the resolution of the app in test must be large enough that the entire app is at full resolution, otherwise some elements may get cut off, causing the comparison to fail. 

4. Running Headed vs Headless

It is recommended to run the screenshot comparison tests headless. This is because cypress can better handle the resolution and sizing of the app in headless mode, resulting in more consistent results.
